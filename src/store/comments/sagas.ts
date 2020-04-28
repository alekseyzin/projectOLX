import { take, select, call, put } from 'redux-saga/effects';
import * as actions from './actions'

export function* getCommentsSaga() {
    while (true) {
        const { payload: { idAdv } } = yield take(actions.getComments.request)
        const jwtToken = yield select(state => state.auth.authData.authToken)
        try {
            const query = [{ $and: [{ "ad._id": idAdv }, { answerTo: null }] }]
            const result = yield call(queryComments, jwtToken, query)
            const commentsData = result.map((d: any) => {
                return {
                    _id: d._id,
                    text: d.text ? d.text : "Не умею писать",
                    createdAt: new Date(Number(d.createdAt)).toLocaleDateString(),
                    avatar: d.owner.avatar?.url ? d.owner.avatar?.url : "images/696abe18feffa8c402f137b7423a869e",
                    nick: d.owner.nick ? d.owner.nick : 'Безымянный',
                    answers: d.answers
                        ? result.map((d: any) => {
                            return {
                                _id: d._id,
                                text: d.text ? d.text : "Не умею писать",
                                createdAt: new Date(Number(d.createdAt)).toLocaleDateString(),
                                avatar: d.owner.avatar?.url ? d.owner.avatar?.url : "images/696abe18feffa8c402f137b7423a869e",
                                nick: d.owner.nick ? d.owner.nick : 'Безымянный',
                            }
                        })
                        : null
                }
            })
            yield put(actions.getComments.success(commentsData))
            console.log(commentsData)
        } catch (e) {
            console.error(e)
        }
    }
}

async function queryComments(jwtToken: string, query: any) {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + jwtToken
        },
        body: JSON.stringify({
            query: `query getComments($query:String){
                CommentFind(query: $query){
                  _id createdAt text owner{nick, avatar{url}}
                  answers{_id, createdAt, text, owner{nick, avatar{url}}}
                }
              }`,
            variables: { "query": JSON.stringify(query) }
        })
    }
    return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
        .then(response => response.json())
        .then(data => data.data.CommentFind)
}