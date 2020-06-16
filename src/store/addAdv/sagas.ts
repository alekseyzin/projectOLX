import { push } from 'connected-react-router';
import { select, take, call, put } from 'redux-saga/effects';
import * as actions from './actions'
import { addAdv, queryUserData } from '../../Services/api'
import { handlerAddImg } from '../../Services/helpers'

export function* setAdvSaga() {
  while (true) {
    const { payload: { title, description, price, address, tags, oldImages, refPhotos, _id } } = yield take(actions.addAdv.request)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    try {
      const idPhotos = yield call(handlerAddImg, oldImages, refPhotos, jwtToken)
      const result = yield call(addAdv, jwtToken, title, description, address, price, tags, idPhotos, _id)
      if (result) yield put(push('/advsaccess'))
    } catch (e) {
      console.error(e)
    }
  }
}

export function* checkUserDataSaga() {
  while (true) {
    yield take(actions.checkUserData)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    const userId = yield select(state => state.auth.authData.id)
    try {
      const userData = yield call(queryUserData, userId, jwtToken)
      if (!userData.nick || !userData.phones) yield put(push('/profile'))
    } catch (e) {
      console.error(e)
    }
  }
}

