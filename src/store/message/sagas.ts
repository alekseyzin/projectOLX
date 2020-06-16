import { select, take, call, put } from 'redux-saga/effects'
import * as actions from './actions'
import { upLoadPhoto, mutationMessage, queryMessageCount, queryMessages } from '../../Services/api'
import { TQueryMessage, IMessageFilter } from './types'
import { handlerMessagesData } from '../../Services/helpers'


export function* setMessageSaga() {
  while (true) {
    const { payload: { userId, text, refPhoto } } = yield take(actions.setMessage.request)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    try {
      let imgId = null
      if (refPhoto.current?.elements[0].files.length) {
        imgId = yield call(upLoadPhoto, jwtToken, new FormData(refPhoto.current))
      }
      const result = yield call(mutationMessage, jwtToken, userId, text, imgId)
      if (result) yield put(actions.setMessage.success('Сообщение успешно отправлено'))
    } catch (e) {
      yield put(actions.setMessage.failure('Сбой в матрице'))
      console.error(e)
    }
  }
}

export function* getMessageSaga() {
  while (true) {
    const { payload: { page } } = yield take(actions.getMessages.request)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    const userId = yield select(state => state.auth.authData.id)
    const limit = yield select(state => state.message.limit)
    try {
      const queryCount: IMessageFilter[] = [{ "to._id": userId }]
      const messageCount = yield call(queryMessageCount, jwtToken, queryCount)
      const pagesCount = Math.ceil(messageCount / limit)
      const checkPage = (page * limit > messageCount) ? Math.ceil(messageCount / limit) - 1 : page - 1
      let queryMessage: TQueryMessage = [{ "to._id": userId }, { sort: [{ _id: -1 }], limit: [limit], skip: [checkPage * limit] }]
      const result = yield call(queryMessages, jwtToken, queryMessage)
      const messagesData = handlerMessagesData(result)
      yield put(actions.getMessages.success({ messagesData, pagesCount }))
    } catch (e) {
      console.error(e)
    }
  }
}

