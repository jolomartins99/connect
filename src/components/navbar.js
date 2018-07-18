import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
                <h1>I am a navigation bar</h1>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        );
    }
}

export default Navbar