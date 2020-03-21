import {all, spawn} from 'redux-saga/effects'
import {authUserSaga} from './auth/sagas'

export default function* rootSaga () {
    yield all([
        spawn(authUserSaga)
    ])
}