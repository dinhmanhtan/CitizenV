import axios from "axios";
import { createContext, useReducer } from "react";
import citizenReducer from "../reducers/citizenReducer";
import { LOCAL_STORAGE_TOKEN_NAME, apiURL } from "../utils/constant";

export const CitizenContext = createContext();

const CitizenContextProvider = ({ children }) => {
  const [citizenState, citizenDispatch] = useReducer(citizenReducer, {
    popList: [], // danh sách dân số
    isLoading: true,
  });

  const { popList } = { citizenState };

  const getAllPopulation = async (idAddress) => {
    citizenDispatch({
      type: "SET_IS_LOADING",
      payload: { isLoading: true },
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
            payload: { popList: data.data, isLoading: false },
          });
        }
      })
      .catch((err) => console.log(err));
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

  const citizenContextData = {
    citizenState,
    getAllPopulation,
    getInforSubAccount,
    citizenDispatch,
  };
  return (
    <CitizenContext.Provider value={citizenContextData}>
      {children}
    </CitizenContext.Provider>
  );
};

export default CitizenContextProvider;
