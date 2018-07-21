import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.display) return null;

    return (
      <div className="search-bar">
        <input type="text" />
      </div>
    )
  }
}