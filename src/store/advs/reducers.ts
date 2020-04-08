import {getType} from 'typesafe-actions'
import * as actions from './actions'
import {IAdvsAction, IState} from './types'

const initialState: IState = {
    advsData: []
}

export default (state:IState = initialState, action:IAdvsAction): IState => {
    switch (action.type) {
        case getType(actions.getAdvs.success):
            // console.log('reducer: ', action.payload)
            return {...state, advsData:[
                ...state.advsData,
                ...action.payload
            ]};
        case getType(actions.deleteAdvs):
            return {...state, advsData:[]}
        default:
            return state;
    }
}