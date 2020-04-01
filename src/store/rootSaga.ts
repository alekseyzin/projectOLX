import {all, spawn} from 'redux-saga/effects'
import {authUserSaga, regUserSaga} from './auth/sagas'
import {getUserData, setUserData, setAvatar} from './profile/sagas'

export default function* rootSaga () {
    yield all([
        spawn(authUserSaga),
        spawn(regUserSaga),
        spawn(getUserData),
        spawn(setUserData),
        spawn(setAvatar),
    ])
}