import React, { Component } from 'react'
import moment from 'moment'

import MentorSettings from './MentorSettings'
import UserSettings from './UserSettings'
import Login from './Login'

const { fetch } = window

export default class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loggedIn: false,
      isMentor: false
    }
  }

  async componentWillMount () {
    let newState = {}
    await fetch('https://api.upframe.io/users/' + window.localStorage.getItem('token'), {
      method: 'GET',
      mode: 'cors'
    })
      .then(res => res.json())
      .catch(err => console.log('Error: ', err))
      .then(data => {
        newState.isMentor = data.type_user === 'mentor'
        newState.loggedIn = ((!moment(new Date()).isAfter(data.token_date_end)) && window.localStorage.getItem('token') != null)
      })
    this.setState(newState)
  }

  render () {
    return (
      <div>
        {this.state.loggedIn
          ? (this.state.isMentor
            ? <MentorSettings />
            : <UserSettings />)
          : (
            <Login />
          )}
      </div>
    )
  }
}
