import React, { Component } from 'react'
const { prompt, fetch, localStorage, alert } = window

export default class AccountTab extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reload: true
    }
  }

  triggerReload = () => {
    let newState = !this.state.reload
    this.setState({
      reload: newState
    })
  }

    changeEmail = () => {
      let newEmail = prompt('Please enter your new email')
      if (newEmail && newEmail.includes('@')) {
        // Backend para mudar o email
        let data = {
          email: newEmail
        }
        let fetchData = {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
        console.log(fetchData)
        fetch('https://api.upframe.io/users/' + localStorage.getItem('token'), fetchData)
          .then(res => res.json())
          .then(res => {
            if (res.message) {
              alert(res.message)
            } else {
              localStorage.setItem('email', newEmail)
              alert('Your email is now ' + newEmail)
              this.triggerReload()
            }
          })
      } else {
        alert('The email you typed isn\'t valid. Try again')
      }
    }

    changePassword = () => {
      let newPassword = prompt('Please enter your new password. Warning: YOUR PASSWORD WILL BE VISIBLE')
      let newPasswordConfirm = prompt('Please enter your new password again')
      if (newPassword === newPasswordConfirm) {
        // Backend para mudar a password
        let data = {
          password: newPassword,
          passwordConfirmation: newPasswordConfirm
          // type_user: 'mentor'
        }
        let fetchData = {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
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

    render () {
      let email = localStorage.getItem('email')
      return (<div className='tab-content'>
        <h1>Email</h1>
        <p>
              Your email address is <a href={'mailto:' + email}>{email}</a>. This information will not be publicly displayed
        </p>
        <button onClick={this.changeEmail}>Change Email</button>
        <h1>Password</h1>
        <p>Set a unique password to protect your account</p>
        <button onClick={this.changePassword}>Change Password</button>
      </div>)
    }
}
