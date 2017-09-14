/*Global variable helpers*/
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'
export const reduxDevCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
export const hasReactDevTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
  Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
export const disableReactDevTools = () => { window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {} }

/*Styling helpers*/
const brandIcons = [ 'twitter', 'github', 'linkedin' ]
export const generateIcon = icon =>
  brandIcons.includes(icon) ? `fab fa-${icon}` : `fal fa-${icon}`
export const generate2xIcon = icon =>
  brandIcons.includes(icon) ? `fab fa-${icon} fa-2x` : `fal fa-${icon} fa-2x`
