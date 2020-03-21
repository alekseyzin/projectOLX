import * as actions from './actions'
import { ActionType } from 'typesafe-actions'

export type AuthAction = ActionType<typeof actions>

export interface IAuthData {
    readonly authToken: string | null;
    readonly error: string | null;
}

export interface IAuthState  {
    readonly authData: IAuthData
}

export interface AuthCreds {
    readonly login: string;
    readonly password: string;
}

export type IAuthAction = ActionType<typeof actions>