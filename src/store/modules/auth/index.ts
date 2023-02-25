import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'models/user';
import { fetchUserDetail } from './action';

type AuthState = {
  isInit: boolean;
  isAuthenticated: boolean;
  isExpired: boolean;
  user?: IUser;
  accessToken?: string;
  isShowSide?: boolean;
};

const initialState: AuthState = {
  isInit: true,
  isAuthenticated: false,
  isExpired: false,
  accessToken: undefined,
  user: undefined,
  isShowSide: undefined,
};

const { actions, reducer: authReducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authentication(
      state,
      action: PayloadAction<Pick<Required<AuthState>, 'user' | 'accessToken'>>,
    ) {
      const { payload } = action;
      state.isInit = false;
      state.isAuthenticated = true;
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.isExpired = false;
    },
    authWithFailed(state) {
      state.isInit = false;
    },
    expireSession(state) {
      if (state.isAuthenticated) {
        state.isAuthenticated = true;
      }
    },
    clear() {
      return { ...initialState, isInit: true };
    },
  },
});

const authActions = { ...actions, fetchUserDetail };

export { authReducer, authActions };
