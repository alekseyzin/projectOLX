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

export function* getMessageSaga () {
  while(true){
    const jwtToken = yield select(state => state.auth.authData.authToken)
    const userId = yield select(state => state.auth.authData.id)
    debugger;
    yield take(actions.getMessages.request)
    try{
      const result = yield call(queryMessages, jwtToken, userId)
      console.log(result)
    }catch(e){
      console.error(e)
    }
  }
}

async function queryMessages(jwtToken:string, userId:string) {
  const query = `[{"_id": "${userId}"}]`
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer " + jwtToken
    },
    body: JSON.stringify({
      query: `query incomMessage($id:String){
        UserFindOne(query:$id){
          incomings{
            _id createdAt text image{url}
            owner{nick avatar{url} phones}
          }
        }
      }`,
      variables: { "id": query}
    })
  }

  return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
    .then(response => response.json())
    .then(data => data)
}


async function mutationMessage(jwtToken:string, userId:string, text:string, imgId:string|null) {
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
      variables: { "to": { _id: userId }, "text": text, "image": {_id: imgId}}
    })
  }

  return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
    .then(response => response.json())
    .then(data => data.data.MessageUpsert._id)
}