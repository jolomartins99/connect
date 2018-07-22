import React, { Component } from 'react';

import MentorSettings from './MentorSettings';
import UserSettings from './UserSettings';
import Login from './Login';

export default class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reload: true,
            isMentor: (localStorage.getItem('isMentor') ? true : false),
            loggedIn: (localStorage.getItem('token') ? true : false)
        }
    }

    refreshSettings = () => {
        this.setState({
            reload: !this.state.reload
        })
    }

    render() {
        return (
            <div>
                {this.state.loggedIn
                    ?
                (this.state.isMentor
                    ?
                <MentorSettings refreshSettings={this.refreshSettings}/>
                    :
                <UserSettings />)
                    :
                (< Login />)
                }
            </div> 
        )
    }
}