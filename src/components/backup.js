import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import firebase from 'firebase'

const { Headers, fetch } = window

// import calendarService from '../logic/calendarService';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class SyncCalendarTab extends Component {
  constructor (props) {
    super(props)
    this.state = {
      calendarNames: [],
      token: '',
      refreshToken: '',
      currId: 0,
      events: [],
      syncStatus: 0 // localStorage.getItem('syncStatus')
    }
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

    saveFreeFlots = () => {
      // Vamos tentar fazer isto sempre que adicionamos um
    }

    syncWithGoogle = () => {

    }

    checkChange = () => {

    }

    showCalendarsCheckBoxes = () => {
      let display = []
      this.calendarList(this.state.token).then(list => {
        list.map(element => {
          display.push({
            id: element,
            checked: false,
            name: element
          })
        })
        console.log(display)
        return (
          <div>
            {
              display.map(index => {
                return <h1>{index.id}</h1>
              })
            }
          </div>
        )
        /*
        return (
          <div>
            {
              display.map((index) => {
                return (
                  <div key={index.id}>
                    <input type='checkbox' id={index.id} onChange={this.checkChange} checked={index.checked} />
                    <label>{index.name}</label>
                  </div>)
              })
            }
          </div>
        ) */
      })

      // let checkBoxList
      // this.calendarList(this.state.token).then(calendars => {
      //     calendars.map(calendarId => {
      //         checkBoxList.push(<h1>{calendarId}</h1>)
      //     })
      //     return checkBoxList
      // })
    }

    // showCalendars = () => {
    //     console.log('Vamos começar')
    //     //this.state.token
    //     let allEvents = [], promiseList = []
    //     this.calendarList(this.state.token).then(calendars => {
    //         //em calendars esta uma lista dos calendar ids
    //         calendars.forEach(calendarId => {
    //             let promise = this.calendarEvents(calendarId)
    //             promise.then(data => {
    //                 for(let event of data.items) allEvents.push(event)
    //             })
    //             promiseList.push(promise)
    //         })
    //         Promise.all(promiseList.then(()=> {
    //             console.log('all events are done')
    //             let convertedEvents = this.convertedEvents(allEvents)
    //             this.setState({events: convertedEvents})
    //         }))
    //     }).then(resultado => {
    //         console.log(resultado)
    //     })

    //     // let calendarEvents = calendars.map(calendar => this.calendarEvents(calendar))
    //     // console.log(calendarEvents)
    //     // console.log('All done')
    //     return (
    //         <h1>
    //             Ola
    //         </h1>
    //     )
    // }

    calendarEvents (calendarId) {
      let customHeaders = new Headers()
      customHeaders.append('Authorization', 'Bearer ' + this.state.token)
      // --
      let data = new Date()
      // --
      return (fetch('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?maxResults=2500&timeMin=' + data.toISOString() + '&singleEvents=true',
        {
          method: 'GET',
          mode: 'cors',
          headers: customHeaders
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data.error && data.error.code === 401) {
            let error = { error: 401, message: data.error.message }
            throw error
          }
          return data
        }))
    }

    calendarList (token) {
      let customHeaders = new Headers()
      let output = []
      customHeaders.append('Authorization', 'Bearer ' + token)

      return (fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList',
        {
          method: 'GET',
          mode: 'cors',
          headers: customHeaders
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data.error && data.error.code === 401) { // Invalid credentials / invalid token
            let error = { error: 401, message: data.error.message }
            throw error
          }
          // console.log(data)
          data.items.forEach(calendar => {
            output.push(calendar.id)
          })
          // console.log(output)
          return output
        }))
    }

    getCalendarList () {
      let promise = this.calendarList()
      let newCalendarMap = { calendarNames: [] }
      promise.then(data => {
        for (let calendar of data.items) {
          newCalendarMap.calendarNames.push([calendar.id, calendar.summary])
        }
        // console.log('Mapa' + newCalendarMap)
        this.setState(newCalendarMap)
      }).catch(err => {
        console.error(err)
        // let's recommend unlink + link
        // console.log(err);
        // alert("We highly recommend linking your account again");
        // this.googleUnlink();
      })
    }

    googleLink = () => {
      let provider = new firebase.auth.GoogleAuthProvider()

      provider.addScope('email')
      provider.addScope('profile')
      // provider.addScope("https://www.googleapis.com/auth/admin.directory.resource.calendar");
      provider.addScope('https://www.googleapis.com/auth/calendar')

      // display browser default language
      firebase.auth().useDeviceLanguage()

      provider.setCustomParameters({
        'access_type': 'offline',
        'prompt': 'consent'
      })

      firebase.auth().signInWithPopup(provider).then(result => {
        // console.log(result)
        this.setState({
          token: result.credential.accessToken,
          refreshToken: result.user.refreshToken
        })
      }).catch(() => {
        // console.log(err);
      })
    }

    render () {
      // if (this.state.token) {
      //    this.calendarList().then(data => {
      //         data.items.forEach(calendar => {
      //             console.log(calendar.id)
      //         })
      //    })
      // }
      return (
        <div className='tab-content calendar-sync'>
          { this.state.token === '' ? (
            <div>
              <button className='main' onClick={this.googleLink}>Sync with Google Calendar</button>
              <BigCalendar
                selectable
                defaultDate={new Date()}
                defaultView='week'
                events={this.state.events}
                onSelectEvent={event => this.deleteFreeSlot(event)}
                onSelectSlot={slot => this.addFreeSlot(slot)}
              />
            </div>
          ) : (
            <div>
                        You are synced with access
              {this.showCalendarsCheckBoxes()}
              <BigCalendar
                selectable
                defaultDate={new Date()}
                defaultView='week'
                events={this.state.events}
                onSelectEvent={event => this.deleteFreeSlot(event)}
                onSelectSlot={slot => this.addFreeSlot(slot)}
              />
            </div>
          )}
        </div>
      )
      /*
        if (this.state.syncStatus === 0) {
            //Ainda não foi visto synced
        } else {
            //Já foi feito o login. Temos acesso a um token
            //Temos que ir buscar a lista de calendarios
            return (
                <div className="tab-content">
                    <div>
                        <div>
                            {this.showCalendars()}
                        </div>
                        <BigCalendar
                            selectable
                            defaultDate={new Date()}
                            defaultView="week"
                            events={this.state.events}
                            onSelectEvent={event => this.deleteFreeSlot(event)}
                            onSelectSlot={slot => this.addFreeSlot(slot)}
                        />
                    </div>
                </div>
            )
        } */
    }
}
