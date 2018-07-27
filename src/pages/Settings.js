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
    await fetch('https://api.upframe.io/users/' + localStorage.getItem('token'), {
      method: 'GET',
      mode: 'cors'
    })
    .then(res => res.json())
    .catch(err => console.log('Error: ', err))
    .then(data => {
      newState.isMentor = data.type_user == 'mentor'
      newState.loggedIn = ((!moment(new Date()).isAfter(data.token_date_end)) && localStorage.getItem('token') != null)
    })
    // await fetch('https://api.upframe.io/users/token/' + localStorage.getItem('token'), {
    //   method: 'GET',
    //   mode: 'cors'
    // })
    // .then(res => res.json())
    // .catch(err => console.log('Error: ', err))
    // .then(data => {
    //   newState.token = data.token
    //   newState.refreshToken = data.refreshToken
    // })
    this.setState(newState)
  }

  render () {
    return (
      <div>
        {this.state.loggedIn
          ? (this.state.isMentor
            ? <MentorSettings token={this.state.token} refreshToken={this.state.refreshToken} />
            : <UserSettings />)
          : (
            <Login />
          )}
      </div>
    )
  }
}
