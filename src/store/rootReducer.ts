import { combineReducers} from 'redux'
import {StateType, EmptyAction} from 'typesafe-actions'
import { connectRouter } from 'connected-react-router'

import history from '../history'
import authReducer from './auth/reducers'
import { AuthAction } from './auth/types'
import {IProfileAction} from './profile/types'
import profileReducer from './profile/reducers'



const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    profile: profileReducer,
})

export type IRootState = StateType<typeof rootReducer>
export type IRootAction = AuthAction | EmptyAction<string> | IProfileAction

export default rootReducer;
