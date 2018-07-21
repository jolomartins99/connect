import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    if(!this.props.display) return null;

    return (
      <div className="search-bar">
        <input type="text" />
      </div>
    )
  }
}