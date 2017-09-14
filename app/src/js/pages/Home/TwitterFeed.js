import React from 'react'

const height =
  screen.height

const width =
  screen.width

const getHeight = () => {
  if (width <= 1024) {
    if (height < 768) {
      return height * 0.5
    }
    return height * 0.75
  }
  return '345'
}

const TwitterFeed = () =>
  <div className='home__twitter-feed'>
    <a className='twitter-timeline' data-height={getHeight()} href='https://twitter.com/rstegd'>
      Tweets by rstegd
    </a>
    <script async src='//platform.twitter.com/widgets.js' charSet='utf-8'></script>
  </div>

export default TwitterFeed
