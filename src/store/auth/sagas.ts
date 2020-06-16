import { take, call, put } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'

import * as actions from './actions'
import { push } from 'connected-react-router'
import { IJWTData } from './types'
import { getAuthToken, regUserRequest } from '../../Services/api'



export function* authUserSaga() {
    if (localStorage.authToken) {
        const jwtData: IJWTData = jwtDecode(localStorage.authToken)
        const jwtToken = localStorage.authToken
        const id = jwtData.sub?.id
        const login = jwtData.sub?.login
        yield put(actions.authUser.success({ jwtToken, id, login }))
    }
    while (true) {
        const { payload: { login, password } } = yield take(actions.authUser.request)

        try {
            const jwtToken = yield call(getAuthToken, login, password)

            if (jwtToken) {
                const jwtData = yield jwtDecode(jwtToken)
                const id = jwtData.sub.id
                const login = jwtData.sub.login
                yield put(actions.authUser.success({ jwtToken, id, login }))
                localStorage.setItem('authToken', jwtToken)
            } else {
                yield put(actions.authUser.failure('Не верный логин или пароль'))
            }

        } catch (error) {
            console.error('error saga: ', error)
            yield put(actions.authUser.failure('Сервер временно не доступен'))
        }
    }
}

export function* regUserSaga() {
    while (true) {
        const { payload } = yield take(actions.regUser.request)
        try {
            const result = yield call(regUserRequest, payload.login, payload.password)
            if (result) {
                yield put(push('/regsuccess'))
            } else {
                yield put(actions.authUser.failure('Такой пользователь уже существует'))
            }
        } catch (error) {
            console.error(error);
            yield put(actions.authUser.failure('Сервер не доступен'))
        }

    }
}

