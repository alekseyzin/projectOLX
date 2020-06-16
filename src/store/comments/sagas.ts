import { TGetCommentQuery } from './../advs/types';
import { take, select, call, put } from 'redux-saga/effects';
import * as actions from './actions'
import {handlerComentsData} from '../../Services/helpers'
import {queryComments, mutationComments} from '../../Services/api'

export function* getCommentsSaga() {
    while (true) {
        const { payload: { idAdv } } = yield take(actions.getComments.request)
        const jwtToken = yield select(state => state.auth.authData.authToken)
        try {
            const query: TGetCommentQuery = [{ "ad._id": idAdv, answerTo: null }, { sort: [{ _id: 1 }] }]
            const result = yield call(queryComments, jwtToken, query)
            const commentsData = handlerComentsData(result)
            yield put(actions.getComments.success(commentsData))
        } catch (e) {
            console.error(e)
        }
    }
}

export function* setCommentSaga() {
    while (true) {
        const { payload: { answerTo, text } } = yield take(actions.setComment.request)
        const jwtToken = yield select(state => state.auth.authData.authToken)
        const advId = yield select(state => state.advCard.advCardData._id)
        try {
            yield call(mutationComments, jwtToken, text, advId, answerTo)
            yield put(actions.getComments.request({ idAdv: advId }))
        } catch (e) {
            console.error(e)
        }
    }
}