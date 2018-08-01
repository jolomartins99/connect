import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import sjcl from 'sjcl'

export default class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      search_key: '',
      type_user: 'mentor',
      message: ''
    }
  }

    signup = () => {
      let data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation,
        type_user: this.state.type_user,
        picture_hash: sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(this.state.email)),
        search_key: this.state.search_key
      }
      let fetchData = {
        method: 'POST',
        body: Object.entries(data).map(e => e.join('=')).join('&'),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
      console.log(fetchData)
      window.fetch('https://api.upframe.io/users/', fetchData)
        .then(res => res.json())
        .then(res => {
          // Nesta resposta podemos ter erro ou então
          // um objeto user com token.
          if (res.token) {
            window.localStorage.setItem('token', res.token)
            window.localStorage.setItem('email', res.email)
            window.localStorage.setItem('token_date_end', res.dateEnd)

            window.location.reload()
          } else {
            window.alert('Could not sign you up')
          }
          console.log(res)
        })
    }

    handleNameChange = (e) => { this.setState({name: e.target.value}) }

    handleEmailChange = (e) => { this.setState({email: e.target.value}) }

    handlePasswordChange = (e) => { this.setState({password: e.target.value}) }

    handlePasswordConfirmationChange = (e) => { this.setState({passwordConfirmation: e.target.value}) }

    handleSearchKeyChange = (e) => { this.setState({search_key: e.target.value}) }

    // handleUserTypeChange = (e) => {this.setState({userType : e.target.value})}

    render () {
      if (window.localStorage.getItem('token')) {
        return <Redirect to='/settings' />
      } else {
        return (
          <div>
            <p>Hello! Welcome to our platform. What can we call you?</p>
            <input onChange={this.handleNameChange} type='text' />
            <p>Whats your email?</p>
            <input onChange={this.handleEmailChange} type='email' />
            <p>Write your password</p>
            <input onChange={this.handlePasswordChange} type='password' />
            <p>Write your password (again)</p>
            <input onChange={this.handlePasswordConfirmationChange} type='password' />
            <p>How do you want people to find you?</p>
            https://connect.upframe.io/<input onChange={this.handleSearchKeyChange} />
            <button onClick={this.signup}>Submit</button>
          </div>
        )
      }
    }
}
