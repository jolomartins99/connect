import React, { Component } from 'react';

import MentorSettings from './MentorSettings';
import UserSettings from './UserSettings';
import Login from './Login';

export default class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedIn: (localStorage.getItem('token') ? true : false)
        }
    }

    isMentor = () => {//TODO
        return false;
    }

    render() {
        return (
            <div>
                {this.state.loggedIn
                    ?
                (this.isMentor()
                    ?
                <MentorSettings />
                    :
                <UserSettings />)
                    :
                (< Login />)
                }
            </div> 
        )
    }
}