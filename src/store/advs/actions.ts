import {createAsyncAction, createAction} from 'typesafe-actions'
import {IState, IAdvsPayload} from './types'

export const getAdvs = createAsyncAction(
    "advs/GET_ADVS_REQUEST",
    "advs/GET_ADVS_SUCCESS",
    "advs/GET_ADVS_FAILURE",
)<IAdvsPayload, IState, string>()

// export const deleteAdvs = createAction(
//     "advs/DFLETE_ADVS"
// )()