import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                <h1>Welcome Mentor, login here</h1>
                <input type="email" value="hello@example.com" />
                <input type="password" />
                <button>Log In</button>
            </div>
        );
    }
}

export default Login