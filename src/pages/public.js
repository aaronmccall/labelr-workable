import React from 'react'
import app from 'ampersand-app'
import localLinks from 'local-links'

export default React.createClass({
  displayName: 'PublicPage',

  onClick (event) {
    const pathname = localLinks.getLocalPathname(event)

    if (pathname) {
      event.preventDefault()
      app.router.history.navigate(pathname, {trigger: true})
    }
  },

  render () {
    return (
      <div onClick={this.onClick} className='container'>
        <header role='banner'>
          <h1>Labelr</h1>
        </header>
        <div>
          <p>We label stuff for you, because, we can&trade;</p>
          <a href='/login' className='button button-large'>
            <span className='mega-octicon octicon-mark-github'></span> Login with GitHub
          </a>
        </div>
      </div>
    )
  }
})