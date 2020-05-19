import {createAsyncAction, createAction} from 'typesafe-actions'
import {IAdv} from './types'

export const addAdv = createAsyncAction (
    "addAdv/ADD_ADV_REQUEST",
    "addAdv/ADD_ADV_SUCCESS",
    "addAdv/ADD_ADV_FAILURE"
)<IAdv, void, void>()

export const checkUserData = createAction (
    "addAdv/CHECK_USER_DATA"
)()