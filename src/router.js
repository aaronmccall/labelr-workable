import app from 'ampersand-app'
import React from 'react'
import Router from 'ampersand-router'
import qs from 'qs'
import xhr from 'xhr'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import RepoDetail from './pages/repo-detail'
import MessagePage from './pages/message'
import Layout from './layout'
import config from './config'

function auth (name) {
  return function () {
    if (app.me.loggedIn) {
      this[name].apply(this, arguments)
    } else {
      this.redirectTo('/')
    }
  }
}

export default Router.extend({
  renderPage (Page, options) {
    const Main = (
      <Layout me={app.me}>
        <Page {...options}/>
      </Layout>
    )

    React.render(Main, document.body)
  },

  routes: {
    '': 'public',
    'repos': auth('repos'),
    'repos/:owner/:reponame': auth('repoDetail'),
    'login': 'login',
    'logout': 'logout',
    'auth/callback': 'authCallback',
    '*catchall': 'fourOhFour'
  },

  public () {
    React.render(<PublicPage/>, document.body)
  },

  repos () {
    this.renderPage(ReposPage, {repos: app.me.repos})
  },

  repoDetail (owner, reponame) {
    // username/repo
    const repo = app.me.repos.getByFullName(owner + '/' + reponame)
    this.renderPage(RepoDetail, {repo: repo, labels: repo.labels})
  },

  login () {
    this.renderPage(MessagePage, {title: 'Logging in...', message: ''})
    window.location = config.authUrl
  },

  logout () {
    window.localStorage.clear()
    window.location = '/'
  },

  authCallback () {
    // ?code=asdfasdf
    const code = qs.parse(window.location.search.slice(1)).code

    xhr({
      url: config.codeUrl + '/' + code,
      json: true
    }, (err, req, body) => {
      if (err) {
        console.error('something went wrong')
      } else {
        app.me.token = body.token
        this.redirectTo('/repos')
      }
    })

    this.renderPage(MessagePage, {title: 'Loading Data', message: 'Fetching from GitHub'})
  },

  fourOhFour () {
    this.renderPage(MessagePage, {title: '404', message: 'page not found'})
  }
})