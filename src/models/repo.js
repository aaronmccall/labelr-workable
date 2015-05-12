import Model from 'ampersand-model'
import Labels from './label-collection'
import githubMixin from '../helpers/github-mixin'

export default Model.extend(githubMixin, {
  url () {
    return 'https://api.github.com/repos/' + this.full_name
  },

  props: {
    id: 'number',
    name: 'string',
    full_name: 'string',
    description: 'string'
  },

  derived: {
    appUrl () {
      return '/repos/' + this.full_name
    }
  },

  collections: {
    labels: Labels
  },

  fetch () {
    Model.prototype.fetch.apply(this, arguments)
    this.labels.fetch()
  }
})