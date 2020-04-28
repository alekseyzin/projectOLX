import { select, take, call, put } from 'redux-saga/effects';
import * as actions from './actions'
import { upLoadPhoto } from '../addAdv/sagas'

export function* setMessageSaga() {
  while (true) {
    const { payload: { userId, text, refPhoto } } = yield take(actions.setMessage.request)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    try {
      let imgId = null
      if (refPhoto.current?.elements[0].files.length) {
        imgId = yield call(upLoadPhoto, jwtToken, new FormData(refPhoto.current))
      }
      const result = yield call(mutationMessage, jwtToken, userId, text, imgId)
      if (result) yield put(actions.setMessage.success('Сообщение успешно отправлено'))
    } catch (e) {
      yield put(actions.setMessage.failure('Сбой в матрице'))
      console.error(e)
    }
  }
}

export function* getMessageSaga() {
  while (true) {
    const {payload:{page}} = yield take(actions.getMessages.request)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    const userId = yield select(state => state.auth.authData.id)
    const limit = 5

    try {
      const queryCount = [{ "to._id": userId }]
      const messageCount = yield call(queryMessageCount, jwtToken, queryCount)
      const pagesCount = Math.ceil(messageCount / limit)
      const checkPage = (page * limit > messageCount) ? Math.ceil(messageCount / limit) - 1 : page - 1
      
      let queryMessage: any = [{ "to._id": userId }, { sort: [{ _id: -1 }], limit: [limit], skip: [checkPage * limit] }]
      const result = yield call(queryMessages, jwtToken, queryMessage)

      const messagesData = result.map((d: any) => {
        return {
          _id: d._id,
          text: d.text ? d.text : "Не умею писать",
          createdAt: new Date(Number(d.createdAt)).toLocaleDateString(),
          image: d.image?.url ? d.image.url : null,
          avatar: d.owner.avatar?.url ? d.owner.avatar?.url : "images/696abe18feffa8c402f137b7423a869e",
          nick: d.owner.nick ? d.owner.nick : 'Безымянный',
          phones: d.owner.phones?.length ? d.owner.phones.join(', ') : "Нет телефона"
        }
      })
      yield put(actions.getMessages.success({messagesData, pagesCount}))
    } catch (e) {
      console.error(e)
    }
  }
}

async function queryMessages(jwtToken: string, query: any) {
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer " + jwtToken
    },
    body: JSON.stringify({
      query: `query incomingMessage($query: String) {
        MessageFind(query: $query){
          _id createdAt text 
          image {url}
          owner {nick avatar{url} phones}
        }
      }`,
      variables: { "query": JSON.stringify(query) }
    })
  }

  return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
    .then(response => response.json())
    .then(data => data.data.MessageFind)
}


async function mutationMessage(jwtToken: string, userId: string, text: string, imgId: string | null) {
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer " + jwtToken
    },
    body: JSON.stringify({
      query: `mutation sendMessage($to:UserInput, $text:String, $image:ImageInput){
            MessageUpsert(message:{to:$to, text:$text, image:$image}){
              _id
            }
          }`,
      variables: { "to": { _id: userId }, "text": text, "image": { _id: imgId } }
    })
  }

  return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
    .then(response => response.json())
    .then(data => data.data.MessageUpsert._id)
}

const queryMessageCount = async (jwtToken: string, query: any) => {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + jwtToken,
    },
    body: JSON.stringify({
      query: `query countAds($query:String){
              MessageCount(query: $query)
            }`,
      variables: { "query": JSON.stringify(query) }
    })
  }
  return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", params)
    .then(data => data.json())
    .then(result => result.data.MessageCount)
}