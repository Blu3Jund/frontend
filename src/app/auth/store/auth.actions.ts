import { createAction, props } from "@ngrx/store";

export const LOGIN_START = createAction(
  "[Auth] Login Start",
  props<{
    email: string;
    password: string;
  }>()
);

export const SIGNUP_START = createAction(
  "[Auth] Signup Start",
  props<{
    email: string;
    password: string;
  }>()
);

export const AUTHENTICATE_SUCCESS = createAction(
  "[Auth] Authenticate Success",
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);

export const AUTHENTICATE_FAIL = createAction(
  "[Auth] Authenticate Fail",
  props<{
    errorMessage: string;
  }>()
);

export const CLEAR_ERROR = createAction("[Auth] Clear Error");

export const AUTO_LOGIN = createAction("[Auth] Auto Login");

export const LOGOUT = createAction("[Auth] Logout");

// export const LOGIN = "[Auth] Login";
// export const LOGIN_FAIL = "[Auth] Login Fail";
// export const LOGOUT = "[Auth] Logout";
//
// export class Login implements Action {
//   readonly type = LOGIN;
//
//   constructor(
//     public payload: {
//       email: string;
//       userId: string;
//       token: string;
//       expirationDate: Date;
//     }
//   ) {}
// }
//
// export class Logout implements Action {
//   readonly type = LOGOUT;
// }
//
// export class LoginStart implements Action {
//   readonly type = LOGIN_START;
//
//   constructor(public payload: { email: string; password: string }) {}
// }
//
// export class LoginFail implements Action {
//   readonly type = LOGIN_FAIL;
//
//   constructor(public payload: string) {}
// }
//
// export type AuthActions = Login | Logout | LoginStart | LoginFail;
