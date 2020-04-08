import {all, spawn} from 'redux-saga/effects'
import {authUserSaga, regUserSaga} from './auth/sagas'
import {getUserData, setUserData, setAvatar} from './profile/sagas'
import {getAdvsData} from './advs/sagas'
import {getAdvCardData} from './adv/sagas'
import {setAdvSaga} from './addAdv/sagas'

export default function* rootSaga () {
    yield all([
        spawn(authUserSaga),
        spawn(regUserSaga),
        spawn(getUserData),
        spawn(setUserData),
        spawn(setAvatar),
        spawn(getAdvsData),
        spawn(getAdvCardData),
        spawn(setAdvSaga),
    ])
}