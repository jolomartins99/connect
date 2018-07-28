import React, { Component } from 'react'
import moment from 'moment'

import MentorSettings from './MentorSettings'
import UserSettings from './UserSettings'
import Login from './Login'

export default class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      refreshToken: '',
      loggedIn: false,
      isMentor: false
    }
  }

  async componentWillMount () {
    let newState = {}
    await window.fetch('https://api.upframe.io/users/' + window.localStorage.getItem('token'), {
      method: 'GET',
      mode: 'cors'
    })
      .then(res => res.json())
      .catch(err => console.log('Error: ', err))
      .then(data => {
        newState.isMentor = data.type_user === 'mentor'
        newState.loggedIn = ((!moment(new Date()).isAfter(data.token_date_end)) && window.localStorage.getItem('token') != null)
      })
    await fetch('http://localhost/users/token/' + localStorage.getItem('token'), {
      method: 'GET',
      mode: 'cors'
    })
    .then(res => res.json())
    .catch(err => console.log('Error: ', err))
    .then(data => {
      newState.token = data.access_token
      newState.refreshToken = data.refresh_token
      newState.tokenExpiration = moment(data.expiration).add(1, "hours")
      if(moment(moment(data.expiration)).isAfter(moment(data.expiration).add(1, "hours"))) {
        //this.refreshTokens();
      }
    })
    this.setState(newState)
  }

  render () {
    return (
      <div>
        {this.state.loggedIn
          ? (this.state.isMentor
            ? <MentorSettings accessToken={this.state.token} refreshToken={this.state.refreshToken} />
            : <UserSettings accessToken={this.state.token} refreshToken={this.state.refreshToken} />)
          : (
            <Login />
          )}
      </div>
    )
  }
}
