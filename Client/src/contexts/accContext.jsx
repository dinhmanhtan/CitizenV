import { createContext, useReducer } from "react";
import { accReducer } from "../reducers/accReducer";
import axios from "axios";
import { apiURL } from "./constant";

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
          payload: { isGetSubAccount: true, subAccount: response.data.account },
        });
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const accContextData = { accState, getSubAccount };
  return (
    <AccContext.Provider value={accContextData}>{children}</AccContext.Provider>
  );
};

export default AccContextProvider;
