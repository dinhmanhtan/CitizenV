import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { apiURL } from "./constant";
import { LOCAL_STORAGE_TOKEN_NAME } from "./constant";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true, // Đang load authentication hay ko
    isAuthenticated: false, // Đã auth hay chưa
    account: null, // Thông tin tài khoản
    getSubAccLoading: true,
    isGetSubAcc: false,
  });

  // Authenticate User

  const loadAccount = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiURL}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, account: response.data.account },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, account: null },
      });
    }
  };

  useEffect(() => loadAccount(), []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/login`, userForm);
      if (response.data.status === "success")
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.account.token
        );

      //
      await loadAccount();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getAllSubAccounts = async () => {
    try {
      dispatch({
        type: "GET_ALL_SUB_ACC",
        payload: { getSubAccLoading: true, isGetSubAcc: false },
      });
      const response = await axios.get(
        `${apiURL}/auth/${authState.account.id}/getAllSubAccounts`
      );
      if (response.data.success) {
        dispatch({
          type: "GET_ALL_SUB_ACC",
          payload: { getSubAccLoading: false, isGetSubAcc: true },
        });
        return response.data;
      } else {
        dispatch({
          type: "GET_ALL_SUB_ACC",
          payload: { getSubAccLoading: false, isGetSubAcc: false },
        });
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    setAuthToken(null);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, account: null },
    });
  };

  // Context data
  const authContextData = { loginUser, authState, getAllSubAccounts, logOut };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
