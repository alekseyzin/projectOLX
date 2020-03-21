import { take, call, put } from 'redux-saga/effects'

import * as actions from './actions'

export function* authUserSaga() {
    while (true) {
        const { payload } = yield take(actions.authUser.request)
        // console.log('saga payload', payload)
        try {
            const result = yield call(getAuthToken, payload.login, payload.password)
            // console.log('fetch  result: ', result)
            if (result) {
                yield put(actions.authUser.success(result))
                localStorage.setItem('authToken', result)
                window.location.href = "/";
            } else {
                yield put(actions.authUser.failure('Не верный логин и пароль'))
            }
           
        } catch (error) {
            console.error('error saga: ', error)
            yield put(actions.authUser.failure('Сервер временно не доступен'))
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