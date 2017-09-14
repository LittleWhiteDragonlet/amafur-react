import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { onScrolling, onScrollingEnd, updateScroll } from 'actions/ui'
import { generate2xIcon } from 'utils/helpers'

class Dock extends Component {
  componentDidMount() {
    window.addEventListener('scroll', () => this.scrollHandle())
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.scrollHandle())
  }
  scrollHandle() {
    const { onScrolling, onScrollingEnd, updateScroll, ui } = this.props
    updateScroll(window.scrollY)
    if (window.scrollY > ui.scrollY) {
      onScrolling()
      if (this.scrollingTimeout) {
        clearTimeout(this.scrollingTimeout)
      }
      this.scrollingTimeout = setTimeout(onScrollingEnd, 450)
    }
  }
  render() {
    const { ui: { isScrolling } } = this.props
    return (
      <div className={`dock ${isScrolling ? 'dock--hide' : ''}`}>
        <a href='mailto:stegmannrd@gmail.com?subject=Hello' className='dock__item'>
          <span className='dock__item-text'>Mail</span>
          <i className={generate2xIcon('paper-plane')}></i>
        </a>
        <NavLink to='/' className='dock__item'>
          <span className='dock__item-text'>Home</span>
          <i className={generate2xIcon('home')}></i>
        </NavLink>
        <NavLink to='/blog' className='dock__item'>
          <span className='dock__item-text'>Blog</span>
          <i className={generate2xIcon('list')}></i>
        </NavLink>
        <NavLink to='/about/languages' className='dock__item'>
          <span className='dock__item-text'>About</span>
          <i className={generate2xIcon('portrait')}></i>
        </NavLink>
      </div>
    )
  }
}

const mapStateToProps = ({ ui }) =>
({
  ui
})

const mapDispatchToProps = dispatch =>
({
  updateScroll: scrollY => dispatch(updateScroll(scrollY)),
  onScrolling: () => dispatch(onScrolling()),
  onScrollingEnd: () => dispatch(onScrollingEnd())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dock)
