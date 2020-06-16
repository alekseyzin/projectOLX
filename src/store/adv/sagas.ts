import { take, put, call, select } from "redux-saga/effects"
import * as actions from './actions'
import { handlerAdvCardData } from '../../Services/helpers'
import { queryAdvData } from '../../Services/api'

export function* getAdvCardData() {
    while (true) {
        const { payload } = yield take(actions.getAdvCard.request)
        const jwtToken = yield select(state => state.auth.authData.authToken)
        try {
            const result = yield call(queryAdvData, payload, jwtToken)
            const advData = handlerAdvCardData(result)
            yield put(actions.getAdvCard.success(advData))
        } catch (e) {
            console.error(e)
            yield put(actions.getAdvCard.failure(false))
        }

    }
}

