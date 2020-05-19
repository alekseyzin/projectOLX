import { take, put, call, select } from 'redux-saga/effects'
import * as actions from './actions'
import { ISort, IFilter, TAdvsData } from './types'

export function* getAdvsData() {
    while (true) {
        const { payload: { type, page, quest } } = yield take(actions.getAdvs.request)
        const jwtToken = yield select(state => state.auth.authData.authToken)
        const userId = yield select(state => state.auth.authData.id)
        const limit = yield select(state => state.advs.advsLimit)
        const sortType = yield select(state => state.advs.sortType)
        yield put(actions.togglePreloader())
        try {
            let filter: IFilter = (type === 'myadvs') ? { ___owner: userId } : {}
            quest && (filter.$or = [{ title: `/${quest}/` }, { description: `/${quest}/` }])
            let queryCountAdvs = [filter]
            const advsCount = yield call(queryAdvsCount, jwtToken, queryCountAdvs)
            if (advsCount > 0) {
                const pagesCount = Math.ceil(advsCount / limit)
                const checkPage = (page * limit > advsCount) ? Math.ceil(advsCount / limit) - 1 : page - 1

                let sort: ISort[] = []
                switch (sortType) {
                    case 'dateDesc':
                        sort = [{ _id: -1 }]
                        break
                    case 'priceDesc':
                        sort = [{ price: -1 }]
                        break
                    case 'priceАsc':
                        sort = [{ price: 1 }]
                        break
                }

                const skip = checkPage * limit
                let queryAdv = [filter, { sort, limit: [limit], skip: [skip] }]
                const result = yield call(queryAdvsData, jwtToken, queryAdv)
                const advsData = result.map((d: any) => {
                    return {
                        ...d,
                        title: d.title || 'Я не умею писать заголовки',
                        createdAt: new Date(Number(d.createdAt)).toLocaleDateString(),
                        price: d.price ? `${d.price} грн` : `Договорная`,
                        address: d.address ? d.address : `Адрес не указан`,
                        images: d.images && d.images[0]?.url
                            ? `http://marketplace.asmer.fs.a-level.com.ua/${d.images[0].url}`
                            : "https://boatparts.com.ua/design/boatparts/images/no_image.png"
                    }
                })
                yield put(actions.getAdvs.success({ advsData, pagesCount }))

            }
        } catch (e) {
            console.error(e)
        }
        yield put(actions.togglePreloader())

    }
}

const queryAdvsData = async (jwtToken: string, query: TAdvsData) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + jwtToken,
        },
        body: JSON.stringify({
            query: `query getAds($query: String){
                AdFind(query: $query) {
                _id,
                images{
                 url
                }
                createdAt,
                title,
                description,
                address,
                price
                }
            }`,
            variables: { "query": JSON.stringify(query) }
        })
    }
    return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", params)
        .then(data => data.json())
        .then(result => result.data.AdFind)
}

const queryAdvsCount = async (jwtToken: string, query: IFilter[]) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + jwtToken,
        },
        body: JSON.stringify({
            query: `query countAds($query:String){
                AdCount(query: $query)
              }`,
            variables: { "query": JSON.stringify(query) }
        })
    }
    return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", params)
        .then(data => data.json())
        .then(result => result.data.AdCount)
}