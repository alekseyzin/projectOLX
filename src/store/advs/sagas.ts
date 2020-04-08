import {take, put, call, select} from 'redux-saga/effects'
import * as actions from './actions'

export function* getAdvsData() {
    while(true){
        yield take(actions.getAdvs.request)
        const jwtToken = yield select(state => state.auth.authData.authToken)
        if(jwtToken){
            try{
                const advsData = yield call(queryAdvsData, jwtToken)
                const result = yield advsData.map((d:any) => {
                    const createdAt = new Date(Number(d.createdAt)).toLocaleDateString()
                    let images = "https://apollo-ireland.akamaized.net/v1/files/76ojf53mron92-UA/image;s=261x203"
                    if(d.images && d.images[0]?.url){
                        images = `http://marketplace.asmer.fs.a-level.com.ua/${d.images[0].url}` 
                    }
                    return{...d,
                        images,
                        createdAt
                    }
                })
                yield put(actions.getAdvs.success(result))
            }catch(e){
                console.error(e)
            }
        }
        
    }
}

const queryAdvsData = async (jwtToken:string) => {
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
            variables: { "query": JSON.stringify([{}, { sort: [{ _id: -1 }] }]) }
        })
    }
    return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", params)
        .then(data => data.json())
        .then(result => result.data.AdFind)
}