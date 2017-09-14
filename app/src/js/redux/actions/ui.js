export const updateScroll = scrollY =>
({
  type: 'UPDATE_SCROLLING',
  payload: {
    scrollY
  }
})

export const onScrolling = () =>
({
  type: 'IS_SCROLLING'
})

export const onScrollingEnd = () =>
({
  type: 'IS_SCROLLING_END'
})
