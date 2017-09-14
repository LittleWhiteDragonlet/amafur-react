const initialState = {
  isScrolling: false,
  scrollY: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'UPDATE_SCROLLING':
    return Object.assign({}, state, {
      scrollY: action.payload.scrollY
    })
  case 'IS_SCROLLING':
    return Object.assign({}, state, {
      isScrolling: true
    })
  case 'IS_SCROLLING_END':
    return Object.assign({}, state, {
      isScrolling: false
    })
  default:
    return state
  }
}
