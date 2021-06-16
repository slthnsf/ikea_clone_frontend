import axios from 'axios';
import { Redirect } from 'react-router';
import { URL_API } from '../pages/helper'
import { Alert } from 'reactstrap';


export const authLogin = (email, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(URL_API + `/users/login`, {
                email, password
            })
            console.log("CEK:", res.data)
            if (res.data.idtb_status == 11) {
                localStorage.setItem('tkn_id', res.data.token)
                await dispatch(getCart(res.data))
                // await dispatch(getTransaction(res.data[0].idtb_user))
                // alert("Your Account Not Verified")
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: { ...res.data }
                })
            } else {
                //jika ingin menjalankan action lain
                //menyimpan data ke reducer
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: { idtb_status: res.data.idtb_status }
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export const getCart = (data) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tkn_id")
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            let res = await axios.get(URL_API + `/transaction/get-cart`, headers)
            console.log("CARTTT:", res.data)
            dispatch({
                type: "UPDATE_CART",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }

}

export const authLogout = () => {
    localStorage.removeItem("tkn_id")
    return {
        type: "LOGOUT"
    }
}


export const keepLogin = (data) => {
    return async (dispatch) => {
        try {
            localStorage.setItem("tkn_id", data.token)
            await dispatch(getCart(data))
            // console.log("cart2")
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...data }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateCart = ({ data, qty, idtb_cart }) => {
    // console.log("cart qty", data)
    return async dispatch => {
        try {
            let updateQty = await axios.patch(URL_API + `/transaction/update-qty`, {
                qty, idtb_cart
            })
            await dispatch(getCart(data))
            //    dispatch({
            //     type: "UPDATE_CART",
            //     payload: cart
            // })
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteCart = (data, idtb_cart) => {
    // console.log("cart qty", data)
    return async dispatch => {
        try {
            await axios.delete(URL_API + `/transaction/delete-cart/${idtb_cart}`)
            await dispatch(getCart(data))
            // let cart = await dispatch(getCart(data))
            // dispatch({
            //     type: "UPDATE_CART",
            //     payload: cart
            // })
        } catch (error) {
            console.log(error)
        }
    }
}




