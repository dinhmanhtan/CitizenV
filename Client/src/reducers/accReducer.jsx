export const accReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_ID_SUB_ACCOUNT":
      return {
        ...state,
        Id_Sub_Account: payload.Id_Sub_Account,
      };

    case "SUB_ACCOUNT":
      return {
        ...state,
        isGetSubAccount: payload.isGetSubAccount,
        subAccount: payload.subAccount,
      };

    default:
      return state;
  }
};
