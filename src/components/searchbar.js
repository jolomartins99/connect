import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    if(!this.props.display) return null;

    return (
      <div className="search-bar">
          <input placeholder="Try looking for a topic, a person or a company..." type="text"/>
      </div>
    )
  }
}
  
SearchBar.defaultProps = {
  display: true
};