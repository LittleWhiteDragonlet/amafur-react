export const refreshPosts = () =>
({
  type: 'REFRESH_POSTS'
})

export const openPostImageCropper = image =>
({
  type: 'OPEN_POST_IMAGE_CROPPER',
  payload: {
    image
  }
})

export const closePostImageCropper = () =>
({
  type: 'CLOSE_POST_IMAGE_CROPPER'
})

export const fetchPosts = () =>
({
  type: 'FETCH_POSTS'
})

export const onFetchPostsSuccess = res =>
({
  type: 'FETCH_POSTS_SUCCESS',
  payload: {
    posts: res.body.posts
  }
})

export const fetchSinglePost = slug =>
({
  type: 'FETCH_SINGLE_POST',
  payload: {
    postId: slug
  }
})

export const onFetchSinglePostSuccess = res =>
({
  type: 'FETCH_SINGLE_POST_SUCCESS',
  payload: {
    post: res.body.post
  }
})

export const createPost = (post, user) =>
({
  type: 'CREATE_POST',
  payload: {
    post,
    user
  }
})

export const onCreatePostSuccess = res =>
({
  type: 'CREATE_POST_SUCCESS',
  payload: {
    post: res.body.post
  }
})

export const editPost = (post, user) =>
({
  type: 'EDIT_POST',
  payload: {
    post,
    user
  }
})

export const onEditPostSuccess = res =>
({
  type: 'EDIT_POST_SUCCESS',
  payload: {
    post: res.body.post
  }
})

export const deletePost = (postId, user) =>
({
  type: 'DELETE_POST',
  payload: {
    postId,
    user
  }
})

export const onDeletePostSuccess = res =>
({
  type: 'DELETE_POST_SUCCESS',
  payload: {
    post: res.body.post
  }
})

export const uploadPostImage = (image, user) =>
({
  type: 'UPLOAD_POST_IMAGE',
  payload: {
    image,
    token: user.token
  }
})

export const onUploadPostImageSuccess = res =>
({
  type: 'UPLOAD_POST_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const onUploadPostImageFailure = error =>
({
  type: 'UPLOAD_POST_IMAGE_FAILURE',
  payload: {
    error
  }
})
