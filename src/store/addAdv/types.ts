import * as actions from './actions'
import {ActionType} from 'typesafe-actions'

export type AddAdvAction = ActionType<typeof actions> 

export interface IAdv {
    title: string
    description: string
    address: string
    price: string
    tags: string
}