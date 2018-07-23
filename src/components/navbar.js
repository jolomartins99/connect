import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

import SearchBar from './searchbar';

export default class Navbar extends Component {

    constructor (props) {
        super (props)
        this.state = {
            loggedIn: (localStorage.getItem('token') ? true : false)
        }
    }

    handleLogout = () => {
        localStorage.setItem('token', '')
        return (<Link to="/settings">Login</Link>)
        window.location.reload();
    }

    render() {
        return (
        <div>
            <nav>
                <div className="wrapper">
                    <div className="logo">
                        <Link to="/"><img src="/media/logotype.svg"></img></Link>
                    </div>  
                    { this.state.loggedIn ? (
                        <div className="profile">
                            <img onClick={this.handleLogout} id="profile" src={localStorage.getItem('profilePicture')} alt="profile-pic"></img>
                    </div>
                    ) : (
                        <div className="login">
                            <Link to="/login" className="button">Login</Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
        )
    }
}

Navbar.defaultProps = {
    search: false
}