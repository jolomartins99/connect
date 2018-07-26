import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from '../components/navbar';

import moment from 'moment';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            email: '',
            password: ''
        }
    }

    login = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        let fetchData = {
            method: 'POST',
            body: Object.entries(data).map(e => e.join('=')).join('&'),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }

        fetch('https://api.upframe.io/users/login', fetchData)
            .then(res => res.json())
            .then(res => {
                //Nesta resposta podemos ter erro ou então
                //um objeto user com token.
                if (res.token) {
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('email', res.email)
                    localStorage.setItem('token_date_end', res.dateEnd);
                    this.setState({
                        isLoggedIn: true
                    });

                    window.location.reload();
                } else {
                    //Error handling
                    //TODO
                    console.log(res);
                }
            })
    }

    handleEmailChange = (e) => { this.setState({ email: e.target.value }) }

    handlePasswordChange = (e) => { this.setState({ password: e.target.value }) }

    render() {
        if (localStorage.getItem('token') && !moment(new Date()).isAfter(localStorage.getItem("token_date_end"))) {
            return <Redirect to="/settings" />;
        } else {
            return (
                <div>
                    <Navbar refreshSettings={this.refreshSettings} />
                    <main id="login">
                        <div className="wrapper">
                            <div>
                                <p>Your email</p>
                                <input onChange={this.handleEmailChange} type="email" placeholder="Your email" />
                            </div>
                            <div>
                                <p>Your password</p>
                                <input onChange={this.handlePasswordChange} type="password"  placeholder="Your password" />
                            </div>
                            <button className="main round" onClick={this.login}>Log In</button>
                        </div>
                    </main>
                </div>
            );
        }
    }
}