import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import moment from 'moment';

import MentorSettings from './MentorSettings';
import UserSettings from './UserSettings';
import Login from './Login';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            loggedIn: false,
            isMentor: false
        }
    }

    async componentWillMount() {
        await fetch("https://api.upframe.io/users/" + localStorage.getItem("token"), {
            method: "GET",
            mode: "cors"
        })
        .then(res => res.json())
        .catch(err => console.log("Error: ", err))
        .then(data => {
            let newState = {
                isMentor: data.type_user == "mentor",
                loggedIn: ((moment(new Date()).isAfter(data.token_date_end) ? false : true) && localStorage.getItem("token") != null)
            };
            this.setState(newState);
        })
    }

    render() {
        return (
            <div>
                {this.state.loggedIn ?
                    (this.state.isMentor ?
                        <MentorSettings refreshSettings={this.refreshSettings}/>
                    :
                        <UserSettings />)
                : (
                    < Login />
                )}
            </div> 
        )
    }
}