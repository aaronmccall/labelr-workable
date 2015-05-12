import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import Label from '../views/label-item'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'RepoDetailPage',

  onCreateLabelClick (event) {
    event.preventDefault()
    const {repo} = this.props
    repo.labels.add({
      name: '',
      color: '',
      editing: true,
      saved: false
    }, {at: 0})
  },

  render() {
    const {repo} = this.props

    return (
      <div className='container'>
        <h1>{repo.full_name} Labels</h1>
        <p>
          <button onClick={this.onCreateLabelClick} className='button'>Create New Label</button>
        </p>
        <ul>
          {repo.labels.map((label) => {
            return <Label key={label.name} label={label}/>
          })}
        </ul>
      </div>
    )
  }
})