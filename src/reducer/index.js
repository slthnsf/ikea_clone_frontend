import {combineReducers} from 'redux'
import {authReducer} from './authReducer'
import { productReducers } from './productReducers'
import { TransactionsReducer } from './transactionsReducer'

export const Reducers = combineReducers({
    authReducer, productReducers, TransactionsReducer
})