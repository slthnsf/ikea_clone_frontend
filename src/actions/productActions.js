//REDUC DEFAULT
// export const getProductAction = (data) => {
//     return {
//         type: "GET_PRODUCTS",
//         payload: data
//     }
// }

import axios from "axios"
import { URL_API } from "../pages/helper"

//REDUX THUNK
export const getProductAction = () => {
    return (dispatch) => {
        axios.get(URL_API+ `/products/get`)
        .then (res => {
            console.log("produk", res.data)
            //mengarahkan data ke reducers
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const sortProducts = (data) => {
        return {
            type: "SORT_PRODUCTS",
            payload: data
        }
    }
