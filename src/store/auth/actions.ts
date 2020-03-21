import {createAsyncAction} from "typesafe-actions"
import {AuthCreds} from './types'

export const authUser = createAsyncAction(
    "auth/AUTH_USER_REQUEST",
    "auth/AUTH_USER_SUCCESS",
    "auth/AUTH_USER_FAILURE"
)<AuthCreds, string | null, string | null>();