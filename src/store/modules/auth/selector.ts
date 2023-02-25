import { RootState } from 'store/root-reducer';

export const authSelector = (rootState: RootState) => rootState.auth;
export const accountSelector = (rootState: RootState) => rootState.auth.user;
export const sidebarSelector = (rootState: RootState) => rootState.auth.isShowSide;
