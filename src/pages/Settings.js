import React, { Component } from 'react';

import MentorSettings from './MentorSettings';
import UserSettings from './UserSettings';
import Login from './Login';

export default class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isMentor: true, //(localStorage.getItem('isMentor') ? true : false),
            loggedIn: true //(localStorage.getItem('token') ? true : false)
        }
    }

    render() {
        return (
            <div>
                {this.state.loggedIn
                    ?
                (this.state.isMentor
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