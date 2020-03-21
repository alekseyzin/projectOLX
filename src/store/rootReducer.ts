import { combineReducers} from 'redux'
import {StateType} from 'typesafe-actions'

import authReducer from './auth/reducers'
import { AuthAction } from './auth/types'

const rootReducer = combineReducers({
    auth: authReducer
})

export type IRootState = StateType<typeof rootReducer>
export type IRootAction = AuthAction

export default rootReducer;
