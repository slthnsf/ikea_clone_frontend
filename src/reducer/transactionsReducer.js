const INITIAL_STATE = {
    transaction_list: []
}

export const TransactionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case  "UPDATE_USERTRANSACTIONS":
            console.log("get transactions reducer", action.payload)
            return {...state, transaction_list: action.payload }
        default:
            return state
    }
}