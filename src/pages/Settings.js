import React, { Component } from 'react';

import MentorSettings from './MentorSettings';
import UserSettings from './UserSettings';
import Login from './Login';

export default class Settings extends Component {

    isLoggedIn = () => {//TODO
        return true;
    }

    isMentor = () => {//TODO
        return false;
    }

    render() {
        return (
            <div>
                {this.isLoggedIn()
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