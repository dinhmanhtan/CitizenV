import axios from "axios";
import { createContext, useReducer } from "react";
import citizenReducer from "../reducers/citizenReducer";
import { LOCAL_STORAGE_TOKEN_NAME, apiURL, getDOB } from "../utils/constant";

export const CitizenContext = createContext();

const CitizenContextProvider = ({ children }) => {
  const [citizenState, citizenDispatch] = useReducer(citizenReducer, {
    popList: [], // danh sách dân số
    isLoading: true,
    isGetSuccess: false,
    searchPopList: null,
    updatedInforSuccess: false,
  });

  const { popList } = { citizenState };

  const getAllPopulation = async (idAddress) => {
    citizenDispatch({
      type: "SET_IS_LOADING",
      payload: { isLoading: true, isGetSuccess: false },
    });
    async function fetchData() {
      const data = await fetch(`${apiURL}/citizen/${idAddress}/population`, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
        },
      });

      return data.json();
    }

    fetchData()
      .then((data) => {
        console.log(data);
        if (data.success) {
          citizenDispatch({
            type: "GET_ALL_POPULATION",
            payload: {
              popList: data.data,
              isLoading: false,
              isGetSuccess: true,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        citizenDispatch({
          type: "GET_ALL_POPULATION",
          payload: {
            isLoading: false,
            isGetSuccess: false,
          },
        });
      });
  };

  const getInforSubAccount = async (id) => {
    try {
      const respone = await axios.get(`${apiURL}/auth/${id}/getAllSubAccounts`);
      if (respone.data.success) {
      }
      return respone.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getInforPerson = (infor, setInfor, setTemptValues, personID) => {
    async function fetchDataPerson() {
      const data = await fetch(`${apiURL}/citizen/${personID}/infomation`, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
        },
      });

      return data.json();
    }

    fetchDataPerson()
      .then((data) => {
        // console.log(data);
        if (data.message === "success") {
          const Infor = data.data;

          setInfor({
            ...infor,
            name: Infor.name,
            DOB: getDOB(Infor.DOB),
            CCCD: Infor.CCCD,
            sex: Infor.sex[0].toUpperCase() + Infor.sex.slice(1),
            religion: Infor.religion,
            academicLevel: Infor.academicLevel,
            job: Infor.job,
            tamTru: Infor.tamTru,
            thuongTru: Infor.thuongTru,
            idAddress: Infor.idAddress,
          });
          setTemptValues(infor);
        }
      })
      .catch((err) => console.error(err));
  };

  const updateInforPerson = (data, _id, setIsEdit) => {
    citizenDispatch({
      type: "UPDATE_INFOR_PERSON",
      payload: { updatedInforSuccess: false },
    });
    async function update(data) {
      const dataResult = await fetch(
        `${apiURL}/citizen/${_id}/changeInfoPerson`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
          },
          body: JSON.stringify(data),
        }
      );

      return dataResult.json();
    }

    update(data)
      .then((response) => {
        if (response.message === "success") {
          citizenDispatch({
            type: "UPDATE_INFOR_PERSON",
            payload: { updatedInforSuccess: true },
          });
          setIsEdit(false);
        } else {
          citizenDispatch({
            type: "UPDATE_INFOR_PERSON",
            payload: { updatedInforSuccess: false },
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const deletePerson = (_id) => {
    async function Delete() {
      const data = await fetch(`${apiURL}/citizen/${_id}/deletePerson`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
        },
      });

      return data.json();
    }

    Delete()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const searchPerson = (input) => {
    citizenDispatch({
      type: "SET_IS_LOADING",
      payload: { isLoading: true, isGetSuccess: false },
    });
    async function search() {
      const data = await fetch(`${apiURL}/citizen/searchPerson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
        },
        body: JSON.stringify(input),
      });

      return data.json();
    }

    search()
      .then((response) => {
        console.log(response);
        if (response.success) {
          citizenDispatch({
            type: "SEARCH_PERSON",
            payload: {
              searchPopList: response.data,
              isLoading: false,
              isGetSuccess: true,
            },
          });
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const citizenContextData = {
    citizenState,
    getAllPopulation,
    getInforSubAccount,
    citizenDispatch,
    getInforPerson,
    updateInforPerson,
    searchPerson,
    deletePerson,
  };
  return (
    <CitizenContext.Provider value={citizenContextData}>
      {children}
    </CitizenContext.Provider>
  );
};

export default CitizenContextProvider;
