import { createContext, useReducer } from "react";
import { accReducer } from "../reducers/accReducer";
import axios from "axios";
import { apiURL } from "../utils/constant";

export const AccContext = createContext();

const AccContextProvider = ({ children }) => {
  const [accState, dispatch] = useReducer(accReducer, {
    Id_Sub_Account: null,
    isGetSubAccount: false,
    subAccount: null,
  });

  const getSubAccount = async (ID_Sub) => {
    try {
      const response = await axios.get(
        `${apiURL}/auth/getSubAccount/${ID_Sub}`
      );
      if (response.data.success) {
        dispatch({
          type: "SUB_ACCOUNT",
          payload: {
            isGetSubAccount: true,
            subAccount: response.data.subAccount,
            id: ID_Sub,
          },
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const setIdSubAccount = (ID) => {
    dispatch({ type: "SET_ID_SUB_ACCOUNT", payload: { Id_Sub_Account: ID } });
  };

  const createNewAccount = async (accountForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/register`, accountForm);
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const deleteSubAccount = async () => {
    try {
      const response = await axios.delete(
        `${apiURL}/auth/${accState.Id_Sub_Account}/deleteAccount`
      );
      if (response.data.success) {
        dispatch({ type: "DELETE_ACCOUNT" });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const changeSubPassword = async (password) => {
    try {
      const respone = await axios.patch(
        `${apiURL}/auth/changeSubPassword/${accState.Id_Sub_Account}`,
        password
      );
      return respone.data;
    } catch (error) {
      console.log(error);
    }
  };

  const accContextData = {
    accState,
    getSubAccount,
    setIdSubAccount,
    createNewAccount,
    deleteSubAccount,
    changeSubPassword,
  };
  return (
    <AccContext.Provider value={accContextData}>{children}</AccContext.Provider>
  );
};

export default AccContextProvider;
