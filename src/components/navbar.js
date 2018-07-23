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
        return (<Redirect to="/settings" />)
        window.location.reload();
    }

    render() {
        return (
        <div>
            <header>
                <div>
                    <div className="logo">
                        <Link to={"/"}>Upframe</Link>
                        {/* <a href="/"><h1 alt="Upframe">Upframe</h1></a> */}
                    </div>  
                    <SearchBar display={this.props.search} />
                    { this.state.loggedIn ? (
                            <img onClick={this.handleLogout} id="top-right-image" src={localStorage.getItem('profilePicture')} alt="profile-pic"></img>
                    ) : (
                        <div id="nav">
                            <Link to="/login" className="button">Login</Link>
                            <Link to="/signup" className="button">Signup</Link>
                        </div>
                    )}
                </div>
            </header>
        </div>
        )
    }
}

Navbar.defaultProps = {
    search: true
}