import React, { Component } from 'react';

import Navbar from '../components/navbar';
import SearchTags from '../components/searchtags';

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h1>What can we help you with</h1>
                <input type="text" />
                <button>Search</button>
                <SearchTags />
            </div>
        );
    }
}

export default Home