import { combineReducers} from 'redux'
import {StateType, EmptyAction} from 'typesafe-actions'
import { connectRouter } from 'connected-react-router'

import history from '../history'
import authReducer from './auth/reducers'
import { AuthAction} from './auth/types'
import {IProfileAction} from './profile/types'
import profileReducer from './profile/reducers'
import {IAdvsAction} from './advs/types'
import advsReducer from './advs/reducers'
import {IAdvCardAction} from './adv/types'
import advCardReducer from './adv/reducers'
import {AddAdvAction} from './addAdv/types'
import messageReducer from './message/reducers'
import {TMessageAction} from './message/types'



const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    profile: profileReducer,
    advs: advsReducer,
    advCard: advCardReducer,
    message: messageReducer,
})

export type IRootState = StateType<typeof rootReducer>
export type IRootAction = AuthAction | EmptyAction<string> | IProfileAction 
    | IAdvsAction | IAdvCardAction | AddAdvAction | TMessageAction

export default rootReducer;
