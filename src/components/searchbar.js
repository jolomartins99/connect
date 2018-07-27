import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import SearchTags from './searchtags'

export default class SearchBar extends Component {
  constructor (props) {
    super(props)
  }

  handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      // Handle the search
      console.log(event.target.value)
    }
  }

  render () {
    if (!this.props.display) return null

    return (
      <div className='search-bar'>
        <div>
          <input placeholder='Try looking for a topic, a person or a company...' type='text' onKeyPress={this.handleKeyPress} />
          <button className={this.props.buttonClass}>Search</button>
        </div>
        <SearchTags />
      </div>
    )
  }
}

SearchBar.defaultProps = {
  display: true,
  buttonClass: 'main fill'
}
