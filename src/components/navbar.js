import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import SearchBar from './searchbar';

export default class Navbar extends Component {

    constructor (props) {
        super (props)
        this.state = {
            loggedIn: (localStorage.getItem('token') ? true : false)
        }
    }

    handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    handleDropdown = () => {
        if(document.querySelector("nav .profile #dropdown").classList.contains("show")) {
            document.querySelector("nav .profile #dropdown").classList.remove("show");
        } else document.querySelector("nav .profile #dropdown").classList.add("show");
    }

    render() {
        let login;
        
        if(this.props.loginButton) {
            login = <a href="/login" className="button">Login</a>;
        }
        return (
        <div>
            <nav>
                <div className="wrapper">
                    <div className="logo">
                        <Link to="/"><img src="/media/logotype.svg"></img></Link>
                    </div>  
                    { this.state.loggedIn ? (
                        <div className="profile">
                            <div>
                                <img id="profile" src={this.props.profilePic} alt="profile-pic" onClick={this.handleDropdown}></img>
                                <div id="dropdown">
                                    <a href="/settings">Settings</a>
                                    <a href="#" onClick={this.handleLogout}>Logout</a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="login">
                            <Link to="/login">Login</Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
        )
    }
}

Navbar.defaultProps = {
    loginButton: true
}
