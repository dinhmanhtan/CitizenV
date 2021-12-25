function citizenReducer(state, action) {
  const {
    type,
    payload: {
      popList,
      isLoading,
      isGetSuccess,
      searchPopList,
      updatedInforSuccess,
    },
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

    case "SEARCH_PERSON":
      return {
        ...state,
        searchPopList,
        isLoading: false,
        isGetSuccess,
      };

    case "UPDATE_INFOR_PERSON":
      return {
        ...state,
        updatedInforSuccess,
      };

    default:
      return state;
  }
}

export default citizenReducer;
