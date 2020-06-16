import { TGetCommentQuery } from '../store/advs/types';
import { IFilterAdvs, TAdvsData } from '../store/advs/types'
import { IMessageFilter, TQueryMessage } from '../store/message/types'

function getHeaders(jwtToken: string) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + jwtToken
        }
    }
}

//Comments

export async function queryComments(jwtToken: string, query: TGetCommentQuery) {
    const data = {
        ...getHeaders(jwtToken),
        body: JSON.stringify({
            query: `query getComments($query:String){
                CommentFind(query: $query){
                  _id, createdAt, text, owner{nick, avatar{url}},
                  answers{_id, createdAt, text, owner{nick, avatar{url}},
                    answers{_id, createdAt, text, owner{nick, avatar{url}}}
                    }
                }
              }`,
            variables: { "query": JSON.stringify(query) }
        })
    }
    return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", data)
        .then(response => response.json())
        .then(data => data.data.CommentFind)
}

export async function mutationComments(jwtToken: string, text: string, ad: string, answerTo: string | null) {
    let variables = { "text": text, "ad": { "_id": ad }, "answerTo": { "_id": answerTo } }
    !answerTo && delete variables.answerTo
    const data = {
        ...getHeaders(jwtToken),
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

//addAdv

interface IPhoto {
    _id: string
}

export const addAdv = async (jwtToken: string, title: string, description: string, address: string, price: string, tags: string, idPhotos: IPhoto[], _id: string | null) => {
    const arrTags = tags.replace(/\s+/g, '').split(',')
    const variables = { "title": title, "description": description, "address": address, "price": Number(price), "tags": arrTags, "images": idPhotos, "_id": _id }
    if (!_id) delete variables._id
    const data = {
        ...getHeaders(jwtToken),
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

export async function upLoadPhoto(jwtToken: string, body: FormData) {
    return fetch('http://marketplace.asmer.fs.a-level.com.ua/upload', {
        method: "POST",
        headers: jwtToken ? { Authorization: 'Bearer ' + jwtToken } : {},
        body: body
    })
        .then(response => response.json())
        .then(data => data._id)
}

//AdvCard

export const queryAdvData = async (id: string, jwtToken: string) => {

    const advQuery = `[{"_id": "${id}"}]`
    const params = {
        ...getHeaders(jwtToken),
        body: JSON.stringify({
            query: `query getAd($adId: String){
                            AdFindOne(query: $adId) {
                              _id,
                              createdAt,
                              owner{_id, nick, phones, createdAt, avatar{url}},
                              images{url, _id},
                              createdAt,
                              title,
                              description,
                              address,
                              price,
                              tags
                            }
                          }`,
            variables: { "adId": advQuery }
        })
    }
    return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", params)
        .then(data => data.json())
        .then(result => result.data.AdFindOne)
}

// Advs

export const queryAdvsData = async (jwtToken: string, query: TAdvsData) => {
    const params = {
        ...getHeaders(jwtToken),
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
            variables: { "query": JSON.stringify(query) }
        })
    }
    return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", params)
        .then(data => data.json())
        .then(result => result.data.AdFind)
}

export const queryAdvsCount = async (jwtToken: string, query: IFilterAdvs[]) => {
    const params = {
        ...getHeaders(jwtToken),
        body: JSON.stringify({
            query: `query countAds($query:String){
                AdCount(query: $query)
              }`,
            variables: { "query": JSON.stringify(query) }
        })
    }
    return fetch("http://marketplace.asmer.fs.a-level.com.ua/graphql", params)
        .then(data => data.json())
        .then(result => result.data.AdCount)
}

// auth 

export const getAuthToken = async (login: string, password: string) => {

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

export const regUserRequest = async (login: string, password: string) => {

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

// message

export async function queryMessages(jwtToken: string, query: TQueryMessage) {
    const data = {
        ...getHeaders(jwtToken),
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


export async function mutationMessage(jwtToken: string, userId: string, text: string, imgId: string | null) {
    const data = {
        ...getHeaders(jwtToken),
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

export const queryMessageCount = async (jwtToken: string, query: IMessageFilter[]) => {
    const params = {
        ...getHeaders(jwtToken),
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

// profile 

export async function queryUserData(userId: string, jwtToken: string) {

    const userQuery = `[{"_id": "${userId}"}]`
    const data = {
        ...getHeaders(jwtToken),
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

export async function mutationUserData(userId: string, jwtToken: string, login: string, nick: string,
    phones: string, addresses: string) {

    const phonesArr = phones.split(', ')
    const data = {
        ...getHeaders(jwtToken),
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

export async function addAvatarToUser(jwtToken: string, userId: string, avaId: string) {
    const data = {
        ...getHeaders(jwtToken),
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