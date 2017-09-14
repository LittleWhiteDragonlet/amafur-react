import { combineEpics } from 'redux-observable'
import authEpics from './auth'
import blogEpics from './blog'

export default combineEpics(
  authEpics,
  blogEpics
)
