import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            email: '',
            password: '',
            type_user: 'user'
        }
    }

    login = () => {
        let data = {
            email: this.state.email,
            password: this.state.password,
            type_user: this.state.type_user
        }
        let fetchData = {
            method: 'POST',
            body: Object.entries(data).map(e => e.join('=')).join('&'),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }
        console.log(fetchData)
        fetch('http://localhost/users/login', fetchData)
            .then(res => res.json())
            .then(res => {
                //Nesta resposta podemos ter erro ou então
                //um objeto user com token.
                if (res.token) {
                    localStorage.setItem('token', res.token)
                    this.setState({isLoggedIn: true})
                } else {
                    //Error handling
                    //TODO
                }
                console.log(res)
            })


        console.log(this.state)
    }

    handleEmailChange = (e) => { this.setState({ email: e.target.value }) }

    handlePasswordChange = (e) => { this.setState({ password: e.target.value }) }

    handleUserTypeChange = (e) => { this.setState({ userType: e.target.value }) }

    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to="/settings" />;
        } else {
            return (
                <div>
                    <h1>Welcome Mentor, login here</h1>
                    <input onChange={this.handleEmailChange} type="email" placeholder="hello@example.com" />
                    <input onChange={this.handlePasswordChange} type="password" />
                    <select onChange={this.handleUserTypeChange}>
                        <option value="user">User</option>
                        <option value="mentor">Mentor</option>
                    </select>
                    <button onClick={this.login}>Log In</button>
                </div>
            );
        }
    }
}

export default Login