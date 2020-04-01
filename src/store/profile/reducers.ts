import { getType } from 'typesafe-actions'

import * as actions from './actions'
import { IProfileDataState, IProfileAction } from './types'

const initialState: IProfileDataState = {
    profileData: {
        _id: '',
        login: '',
        nick: '',
        avatar: {
            _id: "",
            url: ""
        },
        phones: [],
        addresses: [],
        error: "",
        success: ""
    }

}

export default (state: IProfileDataState = initialState, action: IProfileAction) => {
    switch (action.type) {
        case getType(actions.getProfile.success):
            return {
                ...state, profileData: {
                    ...state.profileData,
                    _id: action.payload._id,
                    login: action.payload.login,
                    nick: action.payload.nick,
                    avatar: action.payload.avatar,
                    phones: action.payload.phones,
                    addresses: action.payload.addresses
                }
            }
        case getType(actions.getProfile.failure):
            return {
                ...state, profileData: {
                    ...state.profileData,
                    error: action.payload
                }
            }
        case getType(actions.setProfile.success):
            return {
                ...state, profileData: {
                    ...state.profileData,
                    success: action.payload
                }
            }
        case getType(actions.deleteSuccess):
            return{...state, profileData: {
                ...state.profileData,
                success: ''
            }
        }
        case getType(actions.setAvatar.success):
            return {...state, profileData:{
                ...state.profileData, avatar:{
                    ...state.profileData.avatar,
                    _id: action.payload._id,
                    url: action.payload.url
                }
            }}    
        default:
            return state;
    }
}