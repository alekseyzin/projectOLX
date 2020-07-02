import { take, put, call, select } from 'redux-saga/effects'
import * as actions from './actions'
import { queryAdvsData, queryAdvsCount } from '../../Services/api'
import { getAdsCountFilter, getAdvsDataQuery, handlerAdvsData } from '../../Services/helpers'

export function* getAdvsData() {
    while (true) {
        const { payload: { type, page, quest } } = yield take(actions.getAdvs.request)
        const jwtToken = yield select(state => state.auth.authData.authToken)
        const userId = yield select(state => state.auth.authData.id)
        const limit = yield select(state => state.advs.advsLimit)
        const sortType = yield select(state => state.advs.sortType)
        yield put(actions.togglePreloader())
        try {
            const filter = getAdsCountFilter(type, quest, userId)
            let queryCountAdvs = [filter]
            const advsCount = yield call(queryAdvsCount, jwtToken, queryCountAdvs)
            if (advsCount > 0) {
                const pagesCount = Math.ceil(advsCount / limit)
                let queryAdv = getAdvsDataQuery(filter, advsCount, page, limit, sortType)
                const result = yield call(queryAdvsData, jwtToken, queryAdv)
                const advsData = handlerAdvsData(result)                
                yield put(actions.getAdvs.success({ advsData, pagesCount }))

            } else {
                yield put(actions.getAdvs.success({ advsData: [], pagesCount: 1 }))
            }
        } catch (e) {
            console.error(e)
        }
        yield put(actions.togglePreloader())

    }
}