import * as actions from './actions'
import {ActionType} from 'typesafe-actions'

export type TCommentsAction = ActionType<typeof actions>

export interface IGetCommentsRequest {
    idAdv: string
}
export interface ICommentsState {
    readonly commentsData: IGetCommentsSuccess[]
}

export interface IGetCommentsSuccess {
    readonly _id: string
    readonly createdAt: string
    readonly nick: string
    readonly text: string
    readonly avatar: string
    readonly answers: IComment[] | null
}

export interface IComment {
    readonly _id: string
    readonly createdAt: string
    readonly nick: string
    readonly text: string
    readonly avatar: string
}