const INITIAL_STATE = {
    idtb_user: null,
    username: '',
    email: '',
    role: '',
    cart: []
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            delete action.payload.password
            console.log("Data user reducer", action.payload)
            return { ...state, ...action.payload }
        case "UPDATE_CART":
            console.log("reducer CART", action.payload)
            return { ...state, cart: action.payload }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}