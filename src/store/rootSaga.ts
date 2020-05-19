import {all, spawn} from 'redux-saga/effects'
import {authUserSaga, regUserSaga} from './auth/sagas'
import {getUserData, setUserData, setAvatar} from './profile/sagas'
import {getAdvsData} from './advs/sagas'
import {getAdvCardData} from './adv/sagas'
import {setAdvSaga, checkUserDataSaga} from './addAdv/sagas'
import {setMessageSaga, getMessageSaga} from './message/sagas'
import {getCommentsSaga, setCommentSaga} from './comments/sagas'

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
        spawn(checkUserDataSaga),
        spawn(setMessageSaga),
        spawn(getMessageSaga),
        spawn(getCommentsSaga),
        spawn(setCommentSaga),
    ])
}