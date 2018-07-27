import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

import GoogleLogin from 'react-google-login'
import firebase from 'firebase'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class SyncCalendarTab extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      currId: 0,
      events: []
    }
  }

  saveTokens(token, refreshToken) {
    let reqBody = {
      access_token: token,
      refresh_token: refreshToken
    };
    fetch("https://api.upframe.io/mentors/", {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(reqBody)
    })
  }

  deleteFreeSlot = (event) => {
    console.log(event)
    let listOfEvents = this.state.events
    this.setState({
      events: listOfEvents.filter(singleEvent => singleEvent.id !== event.id)
    })
  }

  addFreeSlot = (slot) => {
    console.log(this.state)
    let currentEvents = this.state.events
    let currentId = this.state.currId
    currentEvents.push({
      id: currentId,
      start: slot.start,
      end: slot.end,
      title: 'Upframe Free Slot'
    })
    this.setState({
      events: currentEvents,
      currId: currentId + 1
    })
  }

  googleLink = () => {
    let provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('email')
    provider.addScope('profile')
    provider.addScope('https://www.googleapis.com/auth/calendar')
    firebase.auth().useDeviceLanguage()
    provider.setCustomParameters({
      'access_type': 'offline',
      'prompt': 'consent'
    })
    firebase.auth().signInWithPopup(provider).then(result => {
      this.setState({
        token: result.credential.accessToken,
        refreshToken: result.user.refreshToken
      })
      //this.saveTokens(result.credential.accessToken, result.user.refreshToken);
    }).catch(err => {
      console.log(err)
    })
  }

  async getCalendarList(token) {
    if (token != "") {
      let customHeaders = new Headers()
      customHeaders.append('Authorization', 'Bearer ' + this.state.token)
      return fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList',
        {
          method: 'GET',
          mode: 'cors',
          headers: customHeaders
        }
      )
    }
  }

  render = () => {
    let promise = this.getCalendarList(this.state.token)
    if (this.state.token) {
      // .then(output => {
      //     anotherList = output.map((element) =>
      //         <h1>{element}</h1>
      //     )
      //     console.log(anotherList)
      // })
      promise.then(res => res.json()).then(data => console.log(data));
      return (
        <div>
          <h1>Habemus</h1>
          <BigCalendar
            selectable
            defaultDate={new Date()}
            defaultView="week"
            events={this.state.events}
            onSelectEvent={event => this.deleteFreeSlot(event)}
            onSelectSlot={slot => this.addFreeSlot(slot)}
          />
        </div>
      )
    } else {
      return (
        <div>
          <button className="main" onClick={this.googleLink}>Sync with Google Calendar</button>
        </div>
      )
    }
  }
}
