import * as actions from './actions'
import { getType } from 'typesafe-actions'
import { IAdvState, IAdvCardAction } from './types'

const initialState: IAdvState = {
    advCardData: {
        _id: "",
        userId: "",
        advDate: "",
        title: "",
        description: "",
        price: "",
        address: "",
        userDate: "",
        phones: [""],
        nick: "",
        avatar: "",
        images: [
            {url: "", _id: ""}
        ],
        tags: "",
    },
    isAdv: true
}


export default (state: IAdvState = initialState, action: IAdvCardAction): IAdvState => {
    switch (action.type) {
        case getType(actions.getAdvCard.success):
            return {
                ...state, advCardData: {
                    ...state.advCardData,
                    ...action.payload
                },
                isAdv: true,
            }
        case getType(actions.getAdvCard.failure):
            return { ...state, isAdv: false }
        case getType(actions.deleteAdvCard):
            return {
                ...state,
                advCardData: {
                    ...state.advCardData,
                    ...initialState.advCardData
                },
                // isAdv: true,
            }
        default:
            return state;
    }
}