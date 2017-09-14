export const resetLogin = () =>
({
  type: 'RESET_LOGIN'
})

export const onLoginSubmit = ({ username, password }) =>
({
  type: 'LOGIN_SUBMIT',
  payload: {
    username,
    password
  }
})

export const onLoginSuccess = res =>
({
  type: 'LOGIN_SUCCESS',
  payload: {
    user: res.body.user,
    token: res.body.token
  }
})

export const onLoginFailure = error =>
({
  type: 'LOGIN_FAILURE',
  payload: {
    error
  }
})
