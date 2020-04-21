import * as actions from './actions'
import {ActionType} from 'typesafe-actions'

export type IAdvsAction = ActionType<typeof actions>

// export interface IImages {
//     url: string | null
// }

// export interface IAdvData {
//     _id: string,
//     title: string,
//     price: string,
//     images: IImages[] | null,
//     address: string,
//     createdAt: string,
// }

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
}

export interface IAdvsPayload {
    type: string,
    page: number,
    quest: string | null
}