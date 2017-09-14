import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import user from './user'
import ui from './ui'
import blog from './blog'

export default combineReducers({
  user,
  ui,
  blog,
  form: formReducer,
  router: routerReducer
})
