import { take, put, call, select } from "redux-saga/effects"
import * as actions from './actions'
import { IImages, IAdvcardData } from './types'

export function* getAdvCardData() {
    while (true) {
        const { payload } = yield take(actions.getAdvCard.request)
        const jwtToken = yield select(state => state.auth.authData.authToken)
        try {
            const result = yield call(queryAdvData, payload, jwtToken)
            const advData:IAdvcardData = {
                advDate: formatDate(result.owner.createdAt),
                title: result.title || "Я не умею писать заголовки",
                description: result.description || "У меня плохой словарный запас",
                price: result.price ? `${result.price} грн.` : "Договорная",
                address: result.address || "Адрес не указан",
                userDate: formatDate(result.createdAt),
                phones: result.owner.phones ? result.owner.phones : ['Нет телефона'],
                nick: result.owner.nick ? result.owner.nick : "Безымянный",
                avatar: result.owner.avatar
                    ? `http://marketplace.asmer.fs.a-level.com.ua/${result.owner.avatar.url}`
                    : "https://apollo-ireland.akamaized.net/v1/files/76ojf53mron92-UA/image;s=261x203",
                images: handlerImages(result.images)
            }
            yield put(actions.getAdvCard.success(advData))
        } catch (e) {
            console.error(e)
            yield put(actions.getAdvCard.failure(false))
        }

    }
}

const queryAdvData = async (id: string, jwtToken: string) => {

    const advQuery = `[{"_id": "${id}"}]`
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + jwtToken,
        },
        body: JSON.stringify({
            query: `query getAd($adId: String){
                            AdFindOne(query: $adId) {
                              _id,
                              createdAt,
                              owner{nick, phones, createdAt, 
                              avatar{url}
                              },
                              images{url},
                              createdAt,
                              title,
                              description,
                              address,
                              price
                            }
                          }`,
            variables: { "adId": advQuery }
        })
    }
    return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", params)
        .then(data => data.json())
        .then(result => result.data.AdFindOne)
}

function formatDate(date: string): string {
    return new Date(Number(date)).toLocaleDateString()
}

function handlerImages(images: IImages[]) {

    if (images && images[0].url) {
        let result = [];
        for (let img of images) {
            img.url && result.push(`http://marketplace.asmer.fs.a-level.com.ua/${img.url}`)
        }
        return result;
    } else {
        return ["https://apollo-ireland.akamaized.net/v1/files/76ojf53mron92-UA/image;s=261x203"]
    }
}