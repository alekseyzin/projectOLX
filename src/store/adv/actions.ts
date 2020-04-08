import {createAsyncAction, createAction} from 'typesafe-actions'
import {IAdvcardData} from './types'

export const getAdvCard = createAsyncAction(
    "adv/GET_ADV_CARD_REQUEST",
    "adv/GET_ADV_CARD_SUCCESS",
    "adv/GET_ADV_CARD_FAILURE",
)<string, IAdvcardData, boolean>()

export const deleteAdvCard = createAction(
    "adv/DELETE_ADV_CARD"
)()