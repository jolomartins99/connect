import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import firebase from 'firebase'

// Compatiblity
const { Headers, fetch, localStorage } = window

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class SyncCalendarTab extends Component {
  constructor (props) {
    super(props)

    this.state = {
      calendars: [{
        id: '123',
        checked: true,
        name: 'Um Dois Tres'
      },{
          id: '321',
          checked: false,
          name: 'Tres Dois Um'
      }],
      token: '',
      currId: 0,
      events: []
    }
  }

  saveTokens (token, refreshToken) {
    let reqBody = {
      access_token: token,
      refresh_token: refreshToken
    }

    fetch('https://api.upframe.io/mentors/token/' + localStorage.getItem('token'), {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  deleteFreeSlot = (event) => {
    let listOfEvents = this.state.events
    this.setState({
      events: listOfEvents.filter(singleEvent => singleEvent.id !== event.id)
    })
  }

  addFreeSlot = (slot) => {
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
    console.log(this.state)
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
      //Agora que temos o token temos que ir buscar uma
      //lista dos calendarios possiveis
      // this.setState({
      //   token: result.credential.accessToken,
      //   refreshToken: result.user.refreshToken
      // })
      this.getCalendarList(result.credential.accessToken)
      .then(res => res.json())
      .then(list => {
        let output = []
        list.items.map(element => {
          output.push({ 
            id: element.id, 
            name: element.summary,
            checked: false 
          })
        })
        return output
      })
      .then(calendarList => {
        this.setState({
          calendars: calendarList,
          token: result.credential.accessToken,
          refreshToken: result.user.refreshToken
        })
      })
      this.saveTokens(result.credential.accessToken, result.user.refreshToken);
    }).catch(err => {
      console.log(err)
    })
  }

  getCalendarList(token) {
    if (token != "") {
      let customHeaders = new Headers()
      customHeaders.append('Authorization', 'Bearer ' + token)
      return fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList',
        {
          method: 'GET',
          mode: 'cors',
          headers: customHeaders
        }
      )
    }
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
    this.calendarEvents('ulissesvf@gmail.com')

    //this.setState(newState)
  }

  calendarEvents = (calendarId) => {
    let customHeaders = new Headers()
    let data = new Date()
    customHeaders.append('Authorization', 'Bearer ' + this.state.token)
    return fetch('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?maxResults=2500&timeMin=' + data.toISOString() + '&singleEvents=true',
      {
        method: 'GET',
        mode: 'cors',
        headers: customHeaders
      }).then(response => response.json())
      .then(data => {
        return data
      })
  }

  convertEvents(element) {
    //id
    //start
    //end
    //title
    if (element.start.dateTime) {
      return {
        id: element.id,
        start: new Date(element.start.dateTime),
        end: new Date(element.end.dateTime),
        title: element.summary
      }
    } else {
      return {
        id: element.id,
        start: moment(element.start.date, 'YYYY-MM-DD').toDate(),
        end: moment(element.end.date, 'YYYY-MM-DD').toDate(),
        title: element.summary
      }
    }

  }

  getCalendarEvents = () => {
    //Para todos os calendarios em this.state.calendars
    //Vamos fazer o request e receber todas as respostas e converter 
    let checkedCalendars = this.state.calendars.filter(calendar => calendar.checked ? calendar : null)
    let calendarIds = checkedCalendars.map(calendar => calendar.id)
    let calendarPromises = calendarIds.map(calendarId => this.calendarEvents(calendarId))
    Promise.all(calendarPromises).then((done) => {
      let allEvents = []
      done.map(eachRequest => {
          allEvents = allEvents.concat(eachRequest.items)}
      )
      return allEvents
    })
    .then(final => {
      let newState = final.map(element => this.convertEvents(element))
      this.setState({
        //events: final.map(element => this.convertEvents(element))
        events: newState
      })
    })
  }

  render = () => {
    if (this.state.token) {
      //const list = this.generateList() DEBUG
      return (
        <div>
          {
            //Para cada calendario vamos criar uma checkbox
            //Sempre que a checkbox mudar vamos mudar o que
            //mostramos no calendario 
            this.state.calendars.map((calendar) => {
              return (
                <div key={calendar.id + 1}>
                  <input type="checkbox" id={calendar.id} onChange={this.checkChange} defaultChecked={calendar.checked}/>
                  <label>{calendar.name}</label>
                </div>
              )
            })
          }
          <button onClick={this.getCalendarEvents}>Get Events</button>
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
