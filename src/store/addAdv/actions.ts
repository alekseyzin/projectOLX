import {createAsyncAction} from 'typesafe-actions'
import {IAdv} from './types'

export const addAdv = createAsyncAction (
    "addAdv/ADD_ADV_REQUEST",
    "addAdv/ADD_ADV_SUCCESS",
    "addAdv/ADD_ADV_FAILURE"
)<IAdv, any, any>()