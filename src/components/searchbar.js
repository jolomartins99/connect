import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

export default class SearchBar extends Component {

  constructor (props) {
    super(props)
  }

  handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      //Handle the search
      console.log(event.target.value)
    }
  }

  render() {
    if(!this.props.display) return null;

    return (
      <div className="search-bar">
          <input placeholder="Try looking for a topic, a person or a company..." type="text" onKeyPress={this.handleKeyPress}/>
      </div>
    )
  }
}
  
SearchBar.defaultProps = {
  display: true
};