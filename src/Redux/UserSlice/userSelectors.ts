import { RootState } from "../store"

export const selectAuthenticated = (state: RootState) => state.user.authenticated;
export const selectUser = (state: RootState) => state.user.userObject;
export const selectUserId = (state: RootState) => state.user.userObject.id;