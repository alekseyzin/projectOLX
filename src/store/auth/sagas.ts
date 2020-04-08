import { take, call, put} from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'

import * as actions from './actions'
import { push } from 'connected-react-router'

export function* authUserSaga() {

    
    if (localStorage.authToken) {
        const jwtData: any = jwtDecode(localStorage.authToken)
        const jwtToken = localStorage.authToken
        const id = jwtData.sub?.id
        const login = jwtData.sub?.login
        yield put(actions.authUser.success({ jwtToken, id, login }))

    }
    while (true) {
        const { payload } = yield take(actions.authUser.request)

        try {
            const jwtToken = yield call(getAuthToken, payload.login, payload.password)

            if (jwtToken) {
                const jwtData = yield jwtDecode(jwtToken)
                const id = jwtData.sub.id
                const login = jwtData.sub.login
                yield put(actions.authUser.success({ jwtToken, id, login }))
                localStorage.setItem('authToken', jwtToken)
            } else {
                yield put(actions.authUser.failure('Не верный логин или пароль'))
            }

        } catch (error) {
            console.error('error saga: ', error)
            yield put(actions.authUser.failure('Сервер временно не доступен'))
        }
    }
}

export function* regUserSaga() {
    while (true) {
        const { payload } = yield take(actions.regUser.request)
        try {
            const result = yield call(regUserRequest, payload.login, payload.password)
            if (result) {
                yield put(push('/regsuccess'))
            } else {
                yield put(actions.authUser.failure('Такой пользователь уже существует'))
            }
        } catch (error) {
            console.error(error);
            yield put(actions.authUser.failure('Сервер не доступен'))
        }

    }
}

const getAuthToken = async (login: string, password: string) => {

    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `query login($login: String!, $password: String!){
          login(login:$login, password:$password)
          }`,
            variables: { "login": login, "password": password }
        })
    }
    return await fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
        .then(response => response.json())
        .then(data => data.data.login)
}

const regUserRequest = async (login: string, password: string) => {

    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `mutation reg($login: String!, $password: String!) {
                createUser(login: $login, password: $password) {
                  _id
                }
              }`,
            variables: { "login": login, "password": password }
        })
    }
    return await fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
        .then(response => response.json())
        .then(data => data.data.createUser)
}