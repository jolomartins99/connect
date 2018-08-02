import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import firebase from 'firebase'
import '../calendar.css'

import Calendar from '../services/calendar'

// Compatiblity
const { localStorage } = window

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class SyncCalendarTab extends Component {
  constructor (props) {
    super(props)

    this.state = {
      calendars: [],
      sync: 0,
      currId: 0,
      events: []
    }
  }

  componentDidMount () {
    let promise = Calendar.init(localStorage.getItem('token'))
    promise.then(logged => {
      if (logged) {
        Calendar.getCalendarList()
          .then(calendarList => {
            this.setState({
              sync: logged,
              calendars: calendarList
            })
          })
      }
    })
  }

  deleteFreeSlot = (event) => {
    if (event.title === 'Upframe Free Slot' && event.tag === 'upframe-free-slot') {
      let listOfEvents = this.state.events
      this.setState({
        events: listOfEvents.filter(singleEvent => singleEvent.id !== event.id)
      })
    }
  }

  addFreeSlot = (slot) => {
    let currentEvents = this.state.events
    let currentId = this.state.currId
    currentEvents.push({
      id: currentId,
      start: slot.start,
      end: slot.end,
      title: 'Upframe Free Slot',
      tag: 'upframe-free-slot'
    })
    this.setState({
      events: currentEvents,
      currId: currentId + 1
    })
  }

  saveSlots = () => {
    Calendar.saveSlots(this.state.events.filter(event => event.tag === 'upframe-free-slot'))
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
      let tokens = {
        accessToken: result.credential.accessToken,
        refToken: result.user.refreshToken,
        expiration: (moment.utc(moment().add(1, 'hours')))
      }
      Calendar.saveToken(tokens)

      Calendar.getCalendarList()
        .then(calendarList => {
          this.setState({
            sync: true,
            calendars: calendarList
          }, Calendar.createUpframeCalendar)
        })
    }).catch(err => {
      console.log(err)
    })
  }

  checkChange = (event) => {
    let newState = this.state.calendars

    if (event.target.checked) {
      newState.forEach(individualCalendar => {
        if (individualCalendar.id === event.target.id) {
          individualCalendar.checked = true
        }
      })
    } else {
      newState.forEach(individualCalendar => {
        if (individualCalendar.id === event.target.id) {
          individualCalendar.checked = false
        }
      })
    }

    this.setState(newState, () => {
      Calendar.getCalendarEvents(newState)
        .then(data => {
          this.setState({
            events: data
          })
        })
    })
  }

  render = () => {
    if (this.state.sync) {
      return (
        <div>
          {
            this.state.calendars.map((calendar) => {
              return (
                <div key={calendar.id + 1}>
                  <input type='checkbox' id={calendar.id} onChange={this.checkChange} defaultChecked={calendar.checked} />
                  <label>{calendar.name}</label>
                </div>
              )
            })
          }
          <button className='main' onClick={this.saveSlots}>Save free time slots</button>
          <BigCalendar
            selectable
            defaultDate={new Date()}
            defaultView='week'
            events={this.state.events}
            onSelectEvent={event => this.deleteFreeSlot(event)}
            onSelectSlot={slot => this.addFreeSlot(slot)}
          />
        </div>
      )
    } else {
      return (
        <div>
          <button className='main' onClick={this.googleLink}>Sync with Google Calendar</button>
        </div>
      )
    }
  }
}
