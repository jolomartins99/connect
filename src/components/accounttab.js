import React, { Component } from 'react';

export default class AccountTab extends Component {
    render() {
        let email = "hello@upframe.io"
        return (
            <div className="tab-content">
                <h1>Email</h1>
                <p>Your email address is <a href={"mailto:" + email}>{email}</a>.
                This information will not be publicly displayed</p>
                <button>Change Email</button>
                <h1>Password</h1>
                <p>Set a unique password to protect your account</p>
                <button>Change Password</button>
            </div>
        );
    }
}