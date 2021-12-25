export const accReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_ID_SUB_ACCOUNT":
      return {
        ...state,
        Id_Sub_Account: payload.Id_Sub_Account,
      };

    case "SUB_ACCOUNT":
      return {
        ...state,
        isGetSubAccount: payload.isGetSubAccount,
        subAccount: payload.subAccount,
        Id_Sub_Account: payload.id,
      };

    case "DELETE_ACCOUNT":
      return {
        Id_Sub_Account: null,
        isGetSubAccount: false,
        subAccount: null,
      };
    case "RESET_":
      return {
        ...state,
        isGetSubAccount: false,
      };

    default:
      return state;
  }
};
