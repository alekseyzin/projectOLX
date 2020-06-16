import * as actions from './actions'
import {ActionType} from 'typesafe-actions'

export type IAdvsAction = ActionType<typeof actions>

export interface IAdv {
    readonly _id: string,
    readonly title: string,
    readonly price: string | null,
    readonly images: string,
    readonly address: string,
    readonly createdAt: string,
}

export interface IState {
    readonly advsData: IAdv[]
    readonly pagesCount: number
    readonly advsLimit: number
    readonly sortType: string
    readonly isFetching: boolean
}

export interface IAdvsPayload {
    type: string,
    page: number,
    quest: string | null
}

export interface IGetAdvsSuccess {
    readonly advsData: IAdv[]
    readonly pagesCount: number
}

export interface IsortArr {
    id: number
    text: string
    value: string
}

export interface ISortAdvs {
    _id?: number
    price?: number
}

export type TAdvsData = Array<IFilterAdvs | ISortPos>

export interface IFilterAdvs {
    ___owner?: string
    $or?: Array<ITitle | IDescription>
}

interface ITitle {
    title: string
}

interface IDescription {
    description: string
}

interface ISortPos {
    sort: ISortAdvs[]
    limit: Array<number>
    skip: Array<number>
}

export type TGetCommentQuery = Array<IFilterComments | ISortPosComments>

interface IFilterComments {
    "ad._id": number
    answerTo: null
} 

interface ISortPosComments {
    sort: IId[]
}

interface IId {
    _id: number
}

export interface IAdvsDataPayload {
    _id: string
    title: string | null
    createdAt: string
    price: number | null
    address: string | null
    images: IImages[] | null

}

export interface IImages {
    url: string | null
    _id: string
}