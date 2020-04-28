import { getType } from 'typesafe-actions'
import * as actions from './actions'
import { IAdvsAction, IState } from './types'

const initialState: IState = {
    advsData: [],
    pagesCount: 1
}

export default (state: IState = initialState, action: IAdvsAction): IState => {
    switch (action.type) {
        case getType(actions.getAdvs.success):
            return {
                ...state,
                advsData: [
                    // ...state.advsData,
                    ...action.payload.advsData
                ],
                pagesCount: action.payload.pagesCount
            };
        // case getType(actions.deleteAdvs):
        //     return { ...state, advsData: [] }
        default:
            return state;
    }
}