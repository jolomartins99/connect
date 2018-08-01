import React, { Component } from 'react'
import sjcl from 'sjcl'
import firebase from 'firebase'
import { Link } from 'react-router-dom'

import Navbar from '../components/navbar'

const { fetch, localStorage } = window

export default class Mentor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nameOfMentor: window.location.pathname.replace('/people/', ''),
      name: 'name',
      mentorProfilePicUrl: 'url', // Mentor profile picture URL
      profilePicUrl: 'profile', // User profile picture URL
      role: 'role',
      company: 'company',
      location: 'location',
      tags: [],
      bio: 'bio',
      freeSlots: [
        {
          index: 0,
          day: 11,
          month: 'jun',
          dateStart: '11:30',
          dateEnd: '12:00'
        }, {
          index: 1,
          day: 12,
          month: 'may',
          dateStart: '11:30',
          dateEnd: '12:00'
        }
      ]
    }
  }

  componentDidMount () {
    let newState = {}
    if (localStorage.getItem('email') != null) {
      let hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(localStorage.getItem('email')))
      firebase.storage().ref('profilepics/' + hash + '.jpg').getDownloadURL().then(url => {
        newState.profilePicUrl = url
        this.setState(newState)
      })
        .catch(() => {
          firebase.storage().ref('profilepics/defaultAvatar.svg').getDownloadURL().then(url => {
            newState.profilePicUrl = url
            this.setState(newState)
          }).catch(err => {
            console.log('MentorSettings.js : ', err)
          })
        })
    }

    // Let's load info
    // Fazemos GET do estilo /mentors/nomeapelido
    fetch('http://api.upframe.io/profile/' + this.state.nameOfMentor, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (!data.error) {
          newState = {
            name: data.name,
            imageUrl: data.imageUrl,
            role: data.role,
            company: data.company,
            location: data.location,
            tags: JSON.parse(data.tags).tags,
            bio: data.bio,
            freeSlots: [
              {
                index: 0,
                day: 11,
                month: 'jun',
                dateStart: '11:30',
                dateEnd: '12:00'
              }
            ]
          }
          this.setState(newState)
        }
      })
    // this.addMonthDay()
  }

  selectFreeSlot = (event) => {
    let num = event.target.id
    console.log(this.state.freeSlots[num])
    // Temos que mostrar as opcoes de schedule de mentoria
    // Temos a informacao da sessao no codigo acima
  }

  mentorTagsToElement = (tags) => {
    return tags.map(tag => {
      return (
        <li className='mentor-tags-list-element'>{tag}</li>
      )
    })
  }

  addMonthDay () {
    let i = 0
    this.state.freeSlots.map(element => {
      let el = document.querySelectorAll(`.free-time-slot[id="${i}"] p`)[0]
      el.insertAdjacentHTML('afterEnd', element.day)
      i++

      return 0
    })
  }

  render () {
    return (
      <div>
        <Navbar profilePic={this.state.profilePicUrl} />
        <main id='mentor-page'>
          <div className='container'>
            <div className='wrapper'>
              <h1 className='pagination'><Link to='/'>Directory</Link> > <Link to='/'>People</Link> > <Link to='#'>{this.state.name}</Link></h1>
              <div className='mentor-card'>
                <div id='profile-pic'>
                  <img alt='' src={this.state.mentorProfilePicUrl} />
                </div>
                <div id='info'>
                  <h1 className='mentor-name'>{this.state.name}</h1>
                  <p>{this.state.role} at {this.state.company}</p>
                  <p>{this.state.location}</p>
                  <ul className='mentor-card-tags'>
                    {this.mentorTagsToElement(this.state.tags)}
                  </ul>
                  <p>{this.state.bio}</p>
                </div>
                <span className='hr' />
                <div id='slots'>
                  {this.state.freeSlots.map(element => {
                    return (
                      <div id={element.index} className='free-time-slot' onClick={this.selectFreeSlot}>
                        <p><span id='month' data-day={element.day}>{element.month}</span></p>
                        <p>{element.dateStart} to {element.dateEnd}</p>
                      </div>
                    )
                  })}
                  <button className='main'>Request</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}
