import * as actions from './actions'
import {ActionType} from 'typesafe-actions'

export type IAdvCardAction = ActionType<typeof actions>

export interface IImages {
    url: string
    _id: string
}

export interface IAdvState {
    advCardData: IAdvcardData,
    isAdv: boolean,
}

export interface IAdvcardData{
    readonly _id: string
    readonly userId: string
    readonly advDate: string
    readonly title: string
    readonly description: string
    readonly price: string
    readonly address: string
    readonly userDate: string
    readonly phones: string[]
    readonly nick: string
    readonly avatar: string
    readonly images: IImages[]
    readonly tags: string
}


// export interface IOwner {
//     nick: string,
//     createdAt: string,
//     phones: Array<string>
//     avatar: IImages | null
// }

// export interface IAdv {
//     _id: string,
//     createdAt: string,
//     owner: IOwner,
//     title: string,
//     price: string,
//     description: string,
//     images: IImages[] | null,
//     address: string,
// }