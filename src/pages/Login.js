import React, { Component } from 'react';

class Login extends Component {

    login = () => {
        alert('Hello')
    }

    render() {
        return (
            <div>
                <h1>Welcome Mentor, login here</h1>
                <input type="email" placeholder="hello@example.com" />
                <input type="password" />
                <button onClick={this.login}>Log In</button>
            </div>
        );
    }
}

export default Login