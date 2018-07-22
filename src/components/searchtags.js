import React, { Component } from 'react';

export default class SearchTags extends Component {
    activateTag = (e) => {
        if(!e.target.classList.contains("active")) e.target.classList.add("active");
        else e.target.classList.remove("active");
    }

    render() {
        return (
            <div className="search-tags">
                <button onClick={this.activateTag}>We</button>
                <button onClick={this.activateTag}>Are</button>
                <button onClick={this.activateTag}>Search</button>
                <button onClick={this.activateTag}>Tags</button>
                <button onClick={this.activateTag}>B2B</button>
            </div>
        );
    }
}