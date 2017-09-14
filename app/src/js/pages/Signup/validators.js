import su from 'superagent'
import { length, path, pipe } from 'ramda'
const API_HOST = '/api/v1'

const getUsername = path([ 'username' ])
const usernameLength = pipe(getUsername, length)

export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.username) {
    errors.username = 'Required'
  } else if (usernameLength(values) > 20) {
    errors.username = 'Maximum 20 characters'
  } else if (usernameLength(values) < 4) {
    errors.username = 'Minimum 4 characters'
  } else if (!/^([a-zA-Z]+)[0-9]*\.*[a-zA-Z0-9]+$|^[a-zA-Z]+[0-9]*$/.test(values.username)) {
    errors.username = 'Invalid username'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password < 6) {
    errors.password = '6 or more characters'
  }
  return errors
}

export const asyncValidate = (values, dispatch, props, field) => {
  const previousErrors = props.asyncErrors
  return new Promise((resolve, reject) => {
    if (field === 'username') {
      reject(su.post(`${API_HOST}/auth/signup/validate_username`)
        .send({ username: values.username })
        .set('Accept', 'application/json')
        .then(res => {
          if (res.body.usernameTaken) {
            // eslint-disable-next-line
            throw Object.assign({}, previousErrors, { username: 'That username is taken'})
          }
        }).catch(err => err)
      )
    } else if (field === 'email') {
      reject(su.post(`${API_HOST}/auth/signup/validate_email`)
        .send({ email: values.email })
        .set('Accept', 'application/json')
        .then(res => {
          if (res.body.emailTaken) {
            // eslint-disable-next-line
            throw Object.assign({}, previousErrors, { email: 'That email is already registerd'})
          }
        }).catch(err => err)
      )
    } else if (previousErrors) {
      reject(previousErrors)
    } else {
      resolve()
    }
  }).catch(err => err)
}
