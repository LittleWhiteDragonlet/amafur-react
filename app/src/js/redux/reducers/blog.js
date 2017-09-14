const initialState = {
  list: [],
  active: {},
  new: {},
  isLoading: false,
  error: null
}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_POSTS':
    return Object.assign({}, state, {
      list: [],
      error: null,
      isLoading: true
    })
  case 'FETCH_POSTS_SUCCESS':
    return Object.assign({}, state, {
      list: action.payload.posts,
      error: null,
      isLoading: false
    })
  case 'FETCH_SINGLE_POST':
    return Object.assign({}, state, {
      active: {
        isLoading: true
      }
    })
  case 'FETCH_SINGLE_POST_SUCCESS':
    return Object.assign({}, state, {
      active: action.payload.post
    })
  case 'FETCH_POSTS_FAILURE':
    return Object.assign({}, state, {
      list: [],
      error: 'Something went wrong. Please contact me if error persists!',
      isLoading: false
    })
  case 'OPEN_POST_IMAGE_CROPPER':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        isCropperOpen: true,
        imagePreview: action.payload.image
      }
    })
  case 'CLOSE_POST_IMAGE_CROPPER':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        isCropperOpen: false,
        imagePreview: null
      }
    })
  case 'CREATE_POST_SUCCESS':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        ...action.payload.post,
        isCreated: true
      }
    })
  case 'EDIT_POST_SUCCESS':
    return Object.assign({}, state, {
      active: {
        ...state.active,
        ...action.payload.post,
        isEdited: true
      }
    })
  case 'LOGOUT':
    return initialState
  default:
    return state
  }
}
