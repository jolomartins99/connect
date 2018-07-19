import React, { Component } from 'react';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            email : '',
            password : '',
            passwordConfirmation : ''
        }
    }

    signup = () => {
        console.log(this.state)
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }   

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handlePasswordConfirmationChange = (e) => {
        this.setState({
            passwordConfirmation: e.target.value
        })
    }

    render() {
        return (
            <div>
                <p>Hello! Welcome to our platform. What can we call you?</p>
                <input onChange={this.handleNameChange} type="text"/>
                <p>Whats your email?</p>
                <input onChange={this.handleEmailChange} type="email"/>
                <p>Write your password</p>
                <input onChange={this.handlePasswordChange} type="password" />
                <p>Write your password (again)</p>
                <input onChange={this.handlePasswordConfirmationChange} type="password" />
                <button onClick={this.signup}>Submit</button>
            </div>
        );
    }
}

export default Signup