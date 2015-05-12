import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'Label',

  onToggleEditClick (event) {
    event.preventDefault()
    const {label} = this.props
    label.editing = !label.editing
    if (!label.editing) {
      if (label.saved) {
        this.setState(this.getInitialState())
      } else {
        label.collection.remove(label)
      }
    }
  },

  getInitialState () {
    const {label} = this.props
    return {
      color: label.color,
      name: label.name
    }
  },

  onNameChange (event) {
    this.setState({
      name: event.target.value
    })
  },

  onColorChange (event) {
    this.setState({
      color: event.target.value.slice(1)
    })
  },

  onDeleteClick (event) {
    const {label} = this.props
    const collection = label.collection
    const models = collection.models.slice()
    label.destroy({
      error () {
        collection.reset(models)
        console.error('could not delete')
      }
    })
    event.preventDefault()
  },

  onFormSubmit (event) {
    event.preventDefault()
    const {label} = this.props
    if (label.saved) {
      label.update(this.state)
    } else {
      label.save(this.state)
    }
    label.editing = false
  },

  render () {
    const {label} = this.props
    const {color, name} = this.state
    const cssColor = '#' + color

    if (label.editing) {
      return (
        <form onSubmit={this.onFormSubmit} className='label'>
          <span style={{backgroundColor: cssColor}} className='label-color'>&nbsp;</span>
          <input value={name} onChange={this.onNameChange} name='name'/>
          <input value={cssColor} onChange={this.onColorChange} name='color'/>
          <button type='submit' className='button button-small'>Save</button>
          <button onClick={this.onToggleEditClick} type='button' className='button button-small button-unstyled'>cancel</button>
        </form>
      )
    } else {
      return (
        <div className='label'>
          <span style={{backgroundColor: '#' + label.color}} className='label-color'>&nbsp;</span>
          <span>{label.name}</span>
          <span onClick={this.onToggleEditClick} className='octicon octicon-pencil'></span>
          <span onClick={this.onDeleteClick} className='octicon octicon-x'></span>
        </div>
      )
    }
  }
})