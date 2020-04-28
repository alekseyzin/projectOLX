import { RefObject } from 'react';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions'

export type TMessageAction = ActionType<typeof actions>

export interface IMessagePayload {
    userId: string
    text: string
    refPhoto: RefObject<HTMLFormElement> | undefined | null
}

export interface IMessageState {
    readonly success: string
    readonly failure: string
    readonly messagesData: IMessageData[]
    readonly pagesCount: number
}

export interface IMessageData {
    readonly _id: string
    readonly createdAt: string
    readonly text: string
    readonly image: string | null
    readonly nick: string
    readonly avatar: string
    readonly phones: string
}

export interface IPageData {
    readonly messagesData: IMessageData[]
    readonly pagesCount: number
}

export interface IPageNumber {
    page: number
}