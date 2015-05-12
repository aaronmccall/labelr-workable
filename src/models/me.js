import Model from 'ampersand-model'
import cacheMixin from 'ampersand-local-cache-mixin'
import ms from 'milliseconds'
import githubMixin from '../helpers/github-mixin'
import RepoCollection from './repo-collection'

export default Model.extend(githubMixin, cacheMixin, {
  url: 'https://api.github.com/user',

  initialize () {
    this.initStorage({
      storageKey: 'me',
      ttl: ms.days(30),
      tts: ms.minutes(5)
    })
    this.on('stale', this.onStale, this)
    this.on('change:token sync', this.writeToStorage, this)
    this.on('change:loggedIn', this.onLoggedInChange, this)
    this.listenTo(this.repos, 'sync', this.writeToStorage)
  },

  props: {
    login: 'string',
    token: 'string'
  },

  derived: {
    loggedIn: {
      deps: ['token'],
      fn () {
        return !!this.token
      }
    }
  },

  collections: {
    repos: RepoCollection
  },

  onStale () {
    if (this.loggedIn) {
      this.fetchAll()
    }
  },

  fetchAll () {
    this.fetch()
    this.repos.fetch()
  },

  serializeToStorage: function () {
    const data = this.toJSON()

    data.repos.forEach((repo) => {
      delete repo.labels
    })

    return data
  },

  onLoggedInChange () {
    if (this.loggedIn) {
      this.fetchAll()
    } else {
      window.localStorage.clear()
    }
  }
})