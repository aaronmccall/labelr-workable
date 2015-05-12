import app from 'ampersand-app'
import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'
import xhr from 'xhr'

export default Model.extend(githubMixin, {
  idAttribute: 'name',

  props: {
    name: 'string',
    color: 'string'
  },

  session: {
    saved: {
      type: 'boolean',
      default: true
    },
    editing: {
      type: 'boolean',
      default: false
    }
  },

  isNew () {
    return !this.saved
  },

  update (newAttributes) {
    const old = this.attributes
    xhr({
      url: this.url(),
      method: 'PATCH',
      json: newAttributes,
      headers: {
        'Authorization': 'token ' + app.me.token
      }
    }, (err) => {
      if (err) {
        this.set(old)
        console.error('check yo wifi')
      }
    })
    this.set(newAttributes)
  }
})