export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, account, isGetSubAcc, getSubAccLoading },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        account,
      };
    case "GET_ALL_SUB_ACC":
      return {
        ...state,
        isGetSubAcc,
        getSubAccLoading,
      };
    case "RESET":
      return action.payload;
    default:
      return state;
  }
};
