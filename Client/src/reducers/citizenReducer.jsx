function citizenReducer(state, action) {
  const {
    type,
    payload: { popList, isLoading },
  } = action;
  switch (type) {
    case "GET_ALL_POPULATION":
      return {
        ...state,
        popList,
        isLoading: false,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading,
      };

    default:
      return state;
  }
}

export default citizenReducer;
