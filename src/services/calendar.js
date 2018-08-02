import { Component } from 'react'
import moment from 'moment'

const { fetch, Headers } = window

export class CalendarService extends Component {
  constructor (props) {
    super(props)

    this.userToken = ''
    this.accessToken = ''
    this.refToken = ''
    this.expiration = ''

    this.init = this.init.bind(this)
    this.refreshToken = this.refreshToken.bind(this)
    this.saveToken = this.saveToken.bind(this)
  }

  /**
   *
   * @param {string} userToken
   *
   */
  init (userToken) {
    this.userToken = userToken

    return fetch('https://api.upframe.io/users/token/' + this.userToken, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(err => {
        console.log('Error fetching token', err)
      })
      .then(data => {
        if (data.code === 4) {
          return false
        }

        this.accessToken = data.access_token
        this.refToken = data.refresh_token
        this.expiration = data.expiration
        return true
      })
  }

  /* Token management */

  refreshToken () {
    fetch('https://securetoken.googleapis.com/v1/token?key=' + process.env.REACT_APP_FIREBASE_APIKEY, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=refresh_token&refresh_token=' + this.refToken
    })
      .then(res => res.json())
      .catch(err => console.log('Error exchaging new access token', err))
      .then(data => {
        let tokens = {
          accessToken: data.access_token,
          refToken: data.refresh_token,
          expiration: (moment.utc(moment().add(1, 'hours')))
        }

        this.accessToken = tokens.accessToken
        this.refToken = tokens.refToken
        this.expiration = tokens.expiration
        this.saveToken(tokens)
      })
  }

  /**
   *
   * @param {object} tokens - contains google access and refresh tokens
   *
   */
  saveToken (tokens) {
    let reqBody = {
      access_token: tokens.accessToken,
      refresh_token: tokens.refToken,
      expiration: tokens.expiration
    }

    this.accessToken = tokens.accessToken
    this.refToken = tokens.refToken
    this.expiration = tokens.expiration

    fetch('https://api.upframe.io/users/token/' + this.userToken, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
      .then(res => res.json())
      .catch(err => console.log('Error saving token', err))
  }

  /**
   * @description retrieves google access tokens
   */
  getToken () {
    return fetch('https://api.upframe.io/users/token/' + this.userToken, {
      method: 'GET',
      mode: 'cors'
    })
      .then(res => res.json())
      .catch(err => {
        console.log('Error:', err)
      })
      .then(data => {
        this.accessToken = data.access_token
        this.refToken = data.refresh_token
        this.expiration = data.expiration
      })
  }

  /**
   *
   * @param {string} token google access token
   *
   */
  getCalendarList (token = '') {
    if (token === '') token = this.accessToken
    let customHeaders = new Headers()
    customHeaders.append('Authorization', 'Bearer ' + token)
    return (fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList',
      {
        method: 'GET',
        mode: 'cors',
        headers: customHeaders
      }
    )
      .then(res => res.json())
      .then(list => {
        let output = []
        list.items.map(element => {
          output.push({
            id: element.id,
            name: element.summary,
            checked: false
          })
          return 0
        })

        return output
      }))
  }

  async getCalendarEvents (calendarList) {
    let checkedCalendars = calendarList.filter(calendar => calendar.checked ? calendar : null)
    let calendarIds = checkedCalendars.map(calendar => calendar.id)
    let calendarPromises = calendarIds.map(calendarId => this.calendarEvents(calendarId))
    let eventsPromise = Promise.all(calendarPromises).then((done) => {
      let allEvents = []
      done.map(eachRequest => {
        allEvents = allEvents.concat(eachRequest.items)
        return 0
      })
      return allEvents
    })
      .then(final => {
        return final.map(element => this.convertEvents(element))
      })
    return eventsPromise
  }

  calendarEvents = (calendarId) => {
    let customHeaders = new Headers()
    let data = new Date()
    customHeaders.append('Authorization', 'Bearer ' + this.accessToken)
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

  convertEvents = (element) => {
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
}

export default new CalendarService()
