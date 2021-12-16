function citizenReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_POPULATION":
      return {
        ...state,
        popList: payload,
      };

    default:
      return state;
  }
}

export default citizenReducer;
