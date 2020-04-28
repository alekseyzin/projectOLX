import {createAsyncAction} from 'typesafe-actions'
import {IGetCommentsRequest, IGetCommentsSuccess} from './types'

export const getComments = createAsyncAction(
    "comment/GET_COMMENT_REQUEST",
    "comment/GET_COMMENT_SUCCESS",
    "comment/GET_COMMENT_FAILURE"
)<IGetCommentsRequest, IGetCommentsSuccess, any>()