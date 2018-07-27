import React, { Component } from 'react' // eslint-disable-line no-unused-vars

import userService from './userService'

export class CalendarService extends Component {
  /* let's get the engines working */
  constructor () {
    super()

    this.init = this.init.bind(this)
    this.CalendarList = this.CalendarList.bind(this)
    this.CalendarEvents = this.CalendarEvents.bind(this)
  }

  init (userId, token, refreshToken, expirationDate) {
    this.userId = userId
    this.accessToken = token
    this.refreshToken = refreshToken
    this.expDate = expirationDate
    this.accountType = userService.AccountType(this.userId)
  }

  // Helper functions
  convertEvents (list) {
    let converted = [],
      num = 0

    for (let event of list) {
      if (event.status === 'confirmed') {
        let convertedEvent = {
          id: num,
          title: event.summary
        }

        if (event.start.dateTime) {
          convertedEvent.start = new Date(event.start.dateTime)
          convertedEvent.end = new Date(event.end.dateTime)
          if (convertedEvent.start.getDate() == 10 && convertedEvent.end.getMonth() == 4) console.log(event)
        } else {
          convertedEvent.start = new Date(event.start.date)
          convertedEvent.end = new Date(event.end.date)
        }

        if (this.accountType === 'mentor' && event.summary.includes('[Connect]')) {
          convertedEvent.title = event.summary
        }

        converted.push(convertedEvent)
        num += 1
      }
    }
    console.log('Num of events' + num)

    return converted
  }

  /* methods */

  // Gets user calendar list
  CalendarList () {
    let customHeaders = new Headers()
    customHeaders.append('Authorization', 'Bearer ' + this.accessToken)

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
          let error = {error: 401, message: data.error.message}
          throw error
        }
        return data
      }))
  }

  // Gets all events from calendar with ID calendarId
  CalendarEvents (calendarId) {
    let customHeaders = new Headers()
    customHeaders.append('Authorization', 'Bearer ' + this.accessToken)

    return (fetch('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events',
      {
        method: 'GET',
        mode: 'cors',
        headers: customHeaders
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.error && data.error.code === 401) {
          let error = {error: 401, message: data.error.message}
          throw error
        }
        return data
      }))
  }
}

export default new CalendarService()
