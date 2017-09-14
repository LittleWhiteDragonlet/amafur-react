import { combineEpics } from 'redux-observable'
import { onLoginSuccess, onLoginFailure } from 'actions/login'
import { onSignupSuccess, onSignupFailure } from 'actions/signup'
import { path } from 'ramda'
import { Observable } from 'rxjs'

import { post } from './helpers/req'

const getError = path([ 'response', 'text', 'error' ])

const api = {
  login: ({ username, password }) =>
    post('auth/login', { username, password }),
  signup: ({ user }) =>
    post('auth/signup', { user })
}

const onLoginSubmit = action$ =>
  action$.ofType('LOGIN_SUBMIT')
    .mergeMap(action =>
      api.login(action.payload)
        .map(onLoginSuccess)
        .catch(res => Observable.of(
          onLoginFailure(getError(res))
        ))
    )

const onSignupSubmit = action$ =>
  action$.ofType('SIGNUP_SUBMIT')
    .mergeMap(action =>
      api.signup(action.payload)
        .map(onSignupSuccess)
        .catch(res => Observable.of(
          onSignupFailure(getError(res))
        ))
      )

export default combineEpics(
  onLoginSubmit,
  onSignupSubmit
)
