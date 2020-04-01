import * as actions from './actions'
import {ActionType} from 'typesafe-actions'

export type IProfileAction = ActionType<typeof actions> 

export interface IProfileDataState {
    profileData: IProfileData
} 

export interface IProfileData {
    readonly _id: string 
    readonly login: string
    readonly nick: string | null
    readonly avatar: IAvatar | null
    readonly phones: string[] | null
    readonly addresses: string[] | null
    readonly error: string
    readonly success: string
}

export interface IAvatar {
    readonly _id: string,
    readonly url: string
}

export interface ISetProfileData {
    readonly login: string
    readonly nick: string
    readonly phones: string
    readonly addresses: string
}
