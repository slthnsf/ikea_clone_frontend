import axios from 'axios';
import { URL_API } from '../pages/helper'

// export const userTransactions = (data) => {
//     return {
//         type: "UPDATE_USERTRANSACTIONS",
//         payload: data
//     }
// }

// export const getCart = (id) => {
//     return async (dispatch) => {
//         try {
//             let res = await axios.get(URL_API + `/transaction/get-cart/${id}`)
//             console.log("CARTTT:", res.data)
//             dispatch({
//                 type: "UPDATE_CART",
//                 payload: res.data
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }

// }

export const getDataCheckout = (data) => {
    return async dispatch => {
        try {
            let token = localStorage.getItem("tkn_id")
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            let res= await axios.get(URL_API + `/transaction/get`, headers)
            console.log("TRANSACTION", res.data)
            // await dispatch(getCart(idtb_user))
            dispatch({
                type: "UPDATE_USERTRANSACTIONS",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}