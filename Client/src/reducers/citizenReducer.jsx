function citizenReducer(state, action) {
  const {
    type,
    payload: { popList, isLoading, isGetSuccess },
  } = action;
  switch (type) {
    case "GET_ALL_POPULATION":
      return {
        ...state,
        popList,
        isLoading: false,
        isGetSuccess,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading,
        isGetSuccess,
      };

    default:
      return state;
  }
}

export default citizenReducer;
