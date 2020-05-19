import { TGetCommentQuery } from './../advs/types';
import { take, select, call, put } from 'redux-saga/effects';
import * as actions from './actions'

export function* getCommentsSaga() {
    while (true) {
        const { payload: { idAdv } } = yield take(actions.getComments.request)
        const jwtToken = yield select(state => state.auth.authData.authToken)
        try {
            const query:TGetCommentQuery = [{ "ad._id": idAdv, answerTo: null }, {sort:[{_id: 1}]}]
            const result = yield call(queryComments, jwtToken, query)
            const commentsData = result.map((d: any) => {
                return {
                    _id: d._id,
                    text: d.text ? d.text : "Не умею писать",
                    createdAt: new Date(Number(d.createdAt)).toLocaleString(),
                    avatar: d.owner.avatar?.url ? d.owner.avatar?.url : "images/696abe18feffa8c402f137b7423a869e",
                    nick: d.owner.nick ? d.owner.nick : 'Безымянный',
                    answers: d.answers
                        ? d.answers.map((d: any) => {
                            return {
                                _id: d._id,
                                text: d.text ? d.text : "Не умею писать",
                                createdAt: new Date(Number(d.createdAt)).toLocaleString(),
                                avatar: d.owner.avatar?.url ? d.owner.avatar?.url : "images/696abe18feffa8c402f137b7423a869e",
                                nick: d.owner.nick ? d.owner.nick : 'Безымянный',
                            }
                        })
                        : null
                }
            })
            yield put(actions.getComments.success(commentsData))
        } catch (e) {
            console.error(e)
        }
    }
}

export function* setCommentSaga() {
    while (true) {
        const { payload: { answerTo, text } } = yield take(actions.setComment.request)
        const jwtToken = yield select(state => state.auth.authData.authToken)
        const advId = yield select(state => state.advCard.advCardData._id)
        try {
            const result = yield call(mutationComments, jwtToken, text, advId, answerTo)
            yield put(actions.getComments.request({idAdv:advId}))
        } catch (e) {

        }
    }
}

async function queryComments(jwtToken: string, query: TGetCommentQuery) {
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

async function mutationComments(jwtToken: string, text: string, ad: string, answerTo: string | null) {
    let variables = {"text": text, "ad":{"_id": ad}, "answerTo":{"_id": answerTo}}
    !answerTo && delete variables.answerTo
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + jwtToken
        },
        body: JSON.stringify({
            query: `mutation setComment($text:String, $ad:AdInput, $answerTo: CommentInput) {
                CommentUpsert(comment:{text: $text, ad: $ad, answerTo:$answerTo}){
                  _id
                }
              }`,
            variables
        })
    }
    return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
        .then(response => response.json())
        .then(data => data.data.CommentUpsert._id)
}