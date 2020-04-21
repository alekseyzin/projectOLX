import { push } from 'connected-react-router';
import { select, take, call, put } from 'redux-saga/effects';
import * as actions from './actions'
import { queryUserData } from '../profile/sagas'

export function* setAdvSaga() {
  while (true) {
    const { payload } = yield take(actions.addAdv.request)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    try {
      const idPhotos = [];
      for (let i = 0; i < 3; i++) {
        let imgId = payload.oldImages[i]?._id ? payload.oldImages[i]._id : null
        if (payload.refPhotos[i].current?.elements[0].files.length) {
          imgId = yield call(upLoadPhoto, jwtToken, new FormData(payload.refPhotos[i].current))
        }
        idPhotos.push({ _id: imgId })
      }
      const result = yield call(addAdv, jwtToken, payload.title, payload.description, payload.address, payload.price, payload.tags, idPhotos, payload._id)
      if (result) yield put(push('/advsaccess'))
    } catch (e) {
      console.error(e)
    }
  }
}

export function* checkUserDataSaga() {
  while (true) {
    yield take(actions.checkUserData)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    const userId = yield select(state => state.auth.authData.id)
    try {
      const userData = yield call(queryUserData, userId, jwtToken)
      if (!userData.nick || !userData.phones) yield put(push('/profile'))
    } catch (e) {
      console.error(e)
    }
  }
}

interface IPhoto {
  _id: string
}

const addAdv = async (jwtToken: string, title: string, description: string, address: string, price: string, tags: string, idPhotos: IPhoto[], _id: string | null) => {
  const arrTags = tags.replace(/\s+/g, '').split(',')
  const variables = { "title": title, "description": description, "address": address, "price": Number(price), "tags": arrTags, "images": idPhotos, "_id": _id }
  if (!_id) delete variables._id
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer " + jwtToken
    },
    body: JSON.stringify({
      query: `mutation addAd($_id: ID, $title: String, $description: String, $address: String, $price: Float, $tags: [String], $images:[ImageInput]) {
            AdUpsert(ad:{_id: $_id, title: $title, description: $description, address: $address, price: $price, tags: $tags, images: $images }){
              _id
            }
          }`,
      variables
    })
  }

  return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
    .then(response => response.json())
    .then(data => data.data.AdUpsert._id)
}

async function upLoadPhoto(jwtToken: string, body: any) {
  return fetch('http://marketplace.asmer.fs.a-level.com.ua/upload', {
    method: "POST",
    headers: jwtToken ? { Authorization: 'Bearer ' + jwtToken } : {},
    body: body
  })
    .then(response => response.json())
    .then(data => data._id)
}