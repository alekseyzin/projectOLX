import { getType } from "typesafe-actions"

import * as actions from "./actions"
import {IAuthState, IAuthAction} from './types'

const initialState: IAuthState = {
    authData: {
        authToken: "",
        error: ""
    }
}

export default (state: IAuthState = initialState, action: IAuthAction): IAuthState => {

    switch (action.type) {
        case getType(actions.authUser.success):
            return {...state, 
                    authData: {
                        authToken: action.payload,
                        error: null
                    } };
        case getType(actions.authUser.failure):
            return {...state,
                    authData: {
                        authToken: null,
                        error: action.payload
                    }
            }
        default:
            return state;
    }
}