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

export interface IAdvCardPayload {
    address: string | null
    createdAt: string
    description: string | null
    price: number | null
    tags: Array<string>
    title: string | null
    _id: string
    owner: IAdvCardOwner
    images: IImages[] | null
}

interface IAdvCardOwner {
    createdAt: string
    nick: string | null
    _id: string
    phones: Array<string>
    avatar: {url: string | null}
}