import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            email : '',
            password : '',
            passwordConfirmation : '',
            type_user : 'user',
            message: ''
        }
    }

    signup = () => {
        let data = {
            name : this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation,
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
        fetch('http://localhost/users/', fetchData)
        .then(res => res.json())
        .then(res => {
            //Nesta resposta podemos ter erro ou então
            //um objeto user com token.
            if (res.token) {
                localStorage.setItem('token', res.token)
                localStorage.setItem("email", res.email);
                localStorage.setItem('type_user',res.type_user)
                //optionals
                localStorage.setItem("name", res.name);
                localStorage.setItem("location", res.location);
                localStorage.setItem("position", res.position);
                localStorage.setItem("company", res.company);
                localStorage.setItem("website", res.website);
                localStorage.setItem("bio", res.bio);
                localStorage.setItem("tags", JSON.stringify(res.tags));
                localStorage.setItem("profilePicture", res.image);
                window.location.reload();
            } else {
                //Error handling
                //TODO
            }
            console.log(res)
        })
    }

    handleNameChange = (e) => {this.setState({name: e.target.value})}

    handleEmailChange = (e) => {this.setState({email: e.target.value})}   

    handlePasswordChange = (e) => {this.setState({password: e.target.value})}

    handlePasswordConfirmationChange = (e) => {this.setState({passwordConfirmation: e.target.value})}

    // handleUserTypeChange = (e) => {this.setState({userType : e.target.value})}

    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to="/settings" />;
        } else {
            return (
                <div>
                    <p>Hello! Welcome to our platform. What can we call you?</p>
                    <input onChange={this.handleNameChange} type="text" />
                    <p>Whats your email?</p>
                    <input onChange={this.handleEmailChange} type="email" />
                    <p>Write your password</p>
                    <input onChange={this.handlePasswordChange} type="password" />
                    <p>Write your password (again)</p>
                    <input onChange={this.handlePasswordConfirmationChange} type="password" />
                    {/* <select onChange={this.handleUserTypeChange}>
                        <option value="user">User</option>
                        <option value="mentor">Mentor</option>
                    </select> */}
                    <button onClick={this.signup}>Submit</button>
                </div>
            );
        }
    }
}