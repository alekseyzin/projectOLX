import { push } from 'connected-react-router';
import { select, take, call, put } from 'redux-saga/effects';
import * as actions from './actions'

export function* setAdvSaga () {
    while(true){
        const {payload} = yield take(actions.addAdv.request)
        const jwtToken = yield select(state => state.auth.authData.authToken)
        try{
            const result = yield call(addAdv, jwtToken, payload.title, payload.description, payload.address, payload.price, payload.tags)
            if(result) yield put(push('/advsaccess')) 
        }catch(e){
            console.error(e)
        }
    }
}

const addAdv = async (jwtToken:string, title:string, description:string, address:string, price:string, tags:string) => {
    const arrTags = tags.replace(/\s+/g, '').split(',')

    const data = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': "Bearer " + jwtToken
        },
        body: JSON.stringify({
          query: `mutation addAd($title: String, $description: String, $address: String, $price: Float, $tags: [String]) {
            AdUpsert(ad:{title: $title, description: $description, address: $address, price: $price, tags: $tags }){
              _id
            }
          }`,
          variables: { "title": title, "description": description, "address": address, "price": Number(price), "tags": arrTags }
        })
      }
    
      return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
        .then(response => response.json())
        .then(data => data.data.AdUpsert._id)
}