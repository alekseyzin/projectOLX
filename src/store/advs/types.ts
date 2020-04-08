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
    _id: string,
    title: string,
    price: string | null,
    images: string,
    address: string,
    createdAt: string,
}

export interface IState {
    advsData: IAdv[]
}