import { createAction, props } from '@ngrx/store';

export const LOGIN_START = createAction(
  '[Auth] Login Start',
  props<{
    email: string;
    password: string;
  }>(),
);

export const SIGNUP_START = createAction(
  '[Auth] Signup Start',
  props<{
    email: string;
    password: string;
  }>(),
);

export const AUTHENTICATE_SUCCESS = createAction(
  '[Auth] Authenticate Success',
  props<{
    email: string;
    userId: string;
    admin: boolean;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>(),
);

export const AUTHENTICATE_FAIL = createAction(
  '[Auth] Authenticate Fail',
  props<{
    errorMessage: string;
  }>(),
);

export const CLEAR_ERROR = createAction('[Auth] Clear Error');

export const AUTO_LOGIN = createAction('[Auth] Auto Login');

export const LOGOUT = createAction('[Auth] Logout');
