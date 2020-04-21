import { take, call, put, select } from 'redux-saga/effects'
import * as actions from './actions'

export function* getUserData() {
  while (true) {
    yield take(actions.getProfile.request)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    const userId = yield select(state => state.auth.authData.id)
    try {
      const userData = yield call(queryUserData, userId, jwtToken)
      yield put(actions.getProfile.success(userData))
    } catch (error) {
      console.error(error)
      yield put(actions.getProfile.failure('Сервер не доступен'))
    }
  }
}

export function* setUserData() {
  while (true) {
    const { payload } = yield take(actions.setProfile.request)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    const userId = yield select(state => state.auth.authData.id)
    try {
      const result = yield call(mutationUserData, userId, jwtToken, payload.login, payload.nick, payload.phones, payload.addresses)
      if (result) {
        yield put(actions.setProfile.success('Данные успешно изменены'))
        const userData = yield call(queryUserData, userId, jwtToken)
        yield put(actions.getProfile.success(userData))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export function* setAvatar() {
  while (true) {
    const { payload } = yield take(actions.setAvatar.request)
    console.log(payload)
    const jwtToken = yield select(state => state.auth.authData.authToken)
    const userId = yield select(state => state.auth.authData.id)
    try {
      const imgData = yield call(upLoadAvatar, jwtToken, payload)
      const result = yield call(addAvatarToUser, jwtToken, userId, imgData._id)
      yield put(actions.setAvatar.success(result))
    } catch (error) {
      console.error(error)
    }
  }
}

export async function queryUserData(userId: string, jwtToken: string) {

  const userQuery = `[{"_id": "${userId}"}]`
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer " + jwtToken
    },
    body: JSON.stringify({
      query: `query getUsers($userQuery: String){
                UserFindOne(query: $userQuery){
                  _id login nick
                  avatar{
                    _id
                    url
                  }
                  phones
                  addresses
                }
              }`,
      variables: { "userQuery": userQuery }
    })
  }

  return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
    .then(response => response.json())
    .then(data => data.data.UserFindOne)
}

async function mutationUserData(userId: string, jwtToken: string, login: string, nick: string, phones: string, addresses: string) {

  // const userQuery = `[{"_id": "${userId}"}]`
  const phonesArr = phones.split(', ')
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer " + jwtToken
    },
    body: JSON.stringify({
      query: `mutation userUpdate ($id: String, $login: String, $nick: String, $phones: [String], $addresses:[String]){
        UserUpsert(user:{
          _id:$id, login:$login, nick:$nick, phones:$phones, addresses:$addresses
        })
        {
          _id
        }
      }`,
      variables: { "id": userId, "login": login, "nick": nick, "phones": phonesArr, "addresses": [addresses] }
    })
  }

  return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
    .then(response => response.json())
    .then(data => data.data.UserUpsert._id)
}

async function upLoadAvatar(jwtToken: string, body: any) {

  return fetch('http://marketplace.asmer.fs.a-level.com.ua/upload', {
    method: "POST",
    headers: jwtToken ? { Authorization: 'Bearer ' + jwtToken } : {},
    body: body
  })
    .then(response => response.json())
    // .then(data => data)
}

async function addAvatarToUser (jwtToken: string, userId: string, avaId: string){
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer " + jwtToken
    },
    body: JSON.stringify({
      query: `mutation addAvatarToUser ($id: String, $avaId: ID){
        UserUpsert(user:{
          _id:$id, avatar:{_id: $avaId}
        })
        {
          avatar{_id url}
        }
      }`,
      variables: { "id": userId, "avaId": avaId }
    })
  }

  return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
    .then(response => response.json())
    .then(data => data.data.UserUpsert.avatar)
}

