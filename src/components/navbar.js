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
                                <img id="profile" src={localStorage.getItem('profilePicture')} alt="profile-pic" onClick={this.handleDropdown}></img>
                                <div id="dropdown">
                                    <a href="/settings">Settings</a>
                                    <a href="#" onClick={this.handleLogout}>Logout</a>
                                </div>
                            </div>
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
