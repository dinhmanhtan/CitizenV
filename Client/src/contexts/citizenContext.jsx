import { createContext, useReducer } from "react";
import  citizenReducer  from "../reducers/citizenReducer";

export const CitizenContext = createContext();

const CitizenContextProvider = ({ children }) => {
    const [citizenState, citizenDispatch] = useReducer(citizenReducer, {
        popList: [], // danh sách dân số
    });
    // Authenticate User
    return (
      <CitizenContext.Provider value={[citizenState, citizenDispatch]}>
        {children}
      </CitizenContext.Provider>
    );
  };
  
  export default CitizenContextProvider;
  

