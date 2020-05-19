import {createAsyncAction, createAction} from 'typesafe-actions'
import {IGetAdvsSuccess, IAdvsPayload} from './types'

export const getAdvs = createAsyncAction(
    "advs/GET_ADVS_REQUEST",
    "advs/GET_ADVS_SUCCESS",
    "advs/GET_ADVS_FAILURE",
)<IAdvsPayload, IGetAdvsSuccess, string>()

// export const deleteAdvs = createAction(
//     "advs/DFLETE_ADVS"
// )()

export const setAdvsLimit = createAction (
    "advs/SET_ADVS_LIMIT"
)<number>()

export const setAdvSort = createAction (
    "advs/SET_ADVS_SORT"
)<string>()

export const togglePreloader = createAction (
    "advs/TOGGLE_PRELOADER"
)()
