import React, { Component } from 'react';

import Navbar from '../components/navbar';
import SearchTags from '../components/searchtags';

export default class Home extends Component {

    search = () => {
    }

    render() {
        return (
            <div>
                <Navbar />
                <div class="search">
                    <h1>What can we help you with?</h1>
                    <input type="text" />
                    <button class="dark" onClick={this.search}>Search</button>
                    <SearchTags />
                </div>
            </div>
        );
    }
}