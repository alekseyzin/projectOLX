import { take, call, put, select } from 'redux-saga/effects'
import * as actions from './actions'
import {upLoadPhoto, queryUserData, mutationUserData, addAvatarToUser} from '../../Services/api' 

export function* getUserData() {
  while (true) {
    yield take(actions.getProfile.request)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    const userId = yield select(state => state.auth.authData.id)
    try {
      const userData = yield call(queryUserData, userId, jwtToken)
      yield put(actions.getProfile.success(userData))
    } catch (error) {
      console.error(error)
      yield put(actions.getProfile.failure('Сервер не доступен'))
    }
  }
}

export function* setUserData() {
  while (true) {
    const { payload: {login, nick, phones, addresses} } = yield take(actions.setProfile.request)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    const userId = yield select(state => state.auth.authData.id)
    try {
      const result = yield call(mutationUserData, userId, jwtToken, login, nick, phones, addresses)
      if (result) {
        yield put(actions.setProfile.success('Данные успешно изменены'))
        const userData = yield call(queryUserData, userId, jwtToken)
        yield put(actions.getProfile.success(userData))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export function* setAvatar() {
  while (true) {
    const { payload } = yield take(actions.setAvatar.request)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    const userId = yield select(state => state.auth.authData.id)
    try {
      const imgData = yield call(upLoadPhoto, jwtToken, payload)
      const result = yield call(addAvatarToUser, jwtToken, userId, imgData)
      yield put(actions.setAvatar.success(result))
    } catch (error) {
      console.error(error)
    }
  }
}

