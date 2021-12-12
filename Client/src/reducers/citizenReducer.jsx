
function citizenReducer(state, action) {
    switch (action.type) {
        case "GET_DATA" :
            console.log(action.payload);
            return {
                ...state,
                popList: [...action.payload],
            }

        default:
            return state
    }
}

export default citizenReducer