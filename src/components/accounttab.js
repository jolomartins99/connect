import React, { Component } from 'react';

export default class AccountTab extends Component {

    changeEmail = () => {
      let newEmail = prompt("Please enter your new email");
      if (newEmail && newEmail.includes('@')) {
        //Backend para mudar o email
        let data = {
          email: newEmail
        }
        let fetchData = {
          method: 'PUT',
          body: Object.entries(data).map(e => e.join('=')).join('&'),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        }
        console.log(fetchData)
        fetch('https://api.upframe.io/users/' + localStorage.getItem('token'), fetchData)
          .then(res => res.json())
          .then(res => {
            if (res.message) {
              alert(res.message)
            } else {
              alert('Your email is now ' + newEmail)
            }
          })
      } else {
        alert('The email you typed isn\'t valid. Try again')
      }
    } 

    changePassword = () => {
      let newPassword = prompt("Please enter your new password. Warning: YOUR PASSWORD WILL BE VISIBLE");
      let newPasswordConfirm = prompt("Please enter your new password again")
      if (newPassword === newPasswordConfirm) {
        //Backend para mudar a password
        let data = {
          password: newPassword,
          passwordConfirmation: newPasswordConfirm,
          type_user: localStorage.getItem("type_user")
        }
        let fetchData = {
          method: 'PUT',
          body: Object.entries(data).map(e => e.join('=')).join('&'),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        }
        console.log(fetchData)
        fetch('https://api.upframe.io/users/' + localStorage.getItem('token'), fetchData)
          .then(res => res.json())
          .then(res => {
            if (res.message) {
              alert(res.message)
            } else {
              alert('Password changed successfully')
            }
          })
      } else {
        alert('Your passwords don\'t match. Try again')
      }
    }

    render() {
        let email = localStorage.getItem("email");
        return (<div className="tab-content">
            <h1>Email</h1>
            <p>
              Your email address is <a href={"mailto:" + email}>{email}</a>. This information will not be publicly displayed
            </p>
            <button onClick={this.changeEmail}>Change Email</button>
            <h1>Password</h1>
            <p>Set a unique password to protect your account</p>
            <button onClick={this.changePassword}>Change Password</button>
    </div>);
    }
}