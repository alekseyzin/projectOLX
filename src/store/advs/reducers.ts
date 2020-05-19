import { getType } from 'typesafe-actions'
import * as actions from './actions'
import { IAdvsAction, IState } from './types'

const initialState: IState = {
    advsData: [],
    pagesCount: 1,
    advsLimit: 5,
    sortType: "dateDesc",
    isFetching: false,
}

export default (state: IState = initialState, action: IAdvsAction): IState => {
    switch (action.type) {
        case getType(actions.getAdvs.success):
            return {
                ...state,
                advsData: [
                    ...action.payload.advsData
                ],
                pagesCount: action.payload.pagesCount
            };
        case getType(actions.setAdvsLimit):
            return {...state, advsLimit: action.payload}
        case getType(actions.setAdvSort):
            return {...state, sortType: action.payload}
        case getType(actions.togglePreloader):
            return {...state, isFetching: !state.isFetching}
        // case getType(actions.deleteAdvs):
        //     return { ...state, advsData: [] }
        default:
            return state;
    }
}