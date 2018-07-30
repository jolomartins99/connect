import React, { Component } from 'react'
import sjcl from 'sjcl'
import firebase from 'firebase'
import { Link } from 'react-router-dom'

import Navbar from '../components/navbar'

const { fetch } = window

export default class Mentor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nameOfMentor: window.location.pathname.replace('/people/', ''),
      name: 'name',
      imageUrl: 'url', // esta e a do mentor que estamos a ver
      profilePicUrl: 'profile', // Esta eh a nossa
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
          day: 11,
          month: 'may',
          dateStart: '11:30',
          dateEnd: '12:00'
        }
      ]
    }
  }

  componentDidMount () {
    let newState = {}
    if (window.localStorage.getItem('email') != null) {
      let hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(window.localStorage.getItem('email')))
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
    fetch('http://localhost/users/mentor/' + this.state.nameOfMentor, {
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
            tags: JSON.parse(data.tags),
            bio: data.bio,
            freeSlots: [
              {
                index: 0,
                day: 11,
                month: 'jun',
                dateStart: '11:30',
                dateEnd: '12:00'
              }, {
                index: 1,
                day: 11,
                month: 'may',
                dateStart: '11:30',
                dateEnd: '12:00'
              }
            ]
          }
          this.setState(newState)
        }
      })
  }

  selectFreeSlot = (event) => {
    let num = event.target.id
    console.log(this.state.freeSlots[num])
    // Temos que mostrar as opcoes de schedule de mentoria
    // Temos a informacao da sessao no codigo acima
  }

  mentorTagsToElement = (tags) => {
    console.log(tags)
    return tags.map(tag => {
      return (
        <li className='mentor-tags-list-element'>{tag.text}</li>
      )
    })
  }

  render () {
    return (
      <div>
        <Navbar profilePic={this.state.profilePicUrl} />
        <main>
          <Link to="/">Directory</Link> > <Link to="/">People</Link> > {this.state.name}
          <img alt='' src={this.state.imageUrl} />
          <p>{this.state.role} at {this.state.company}</p>
          <p>{this.state.location}</p>
          <ul className='mentor-card-tags'>
            {this.mentorTagsToElement(this.state.tags)}
          </ul>
          <p>{this.state.bio}</p>
          {/* {this.showFreeSlots()} */}
          {this.state.freeSlots.map(element => {
            return (
              <div id={element.index} className='free-time-slot' onClick={this.selectFreeSlot}>
                <p id={element.index}>{element.day} of {element.month}</p>
                <p id={element.index}>{element.dateStart} to {element.dateEnd}</p>
              </div>
            )
          })}
        </main>
      </div>
    )
  }
}
