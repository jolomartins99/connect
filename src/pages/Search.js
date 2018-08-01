import React, { Component } from 'react'
import sjcl from 'sjcl'
import firebase from 'firebase'

import MentorList from '../components/mentorlist'
import Navbar from '../components/navbar'
import SearchBar from '../components/searchbar'

const { fetch } = window

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mentors: [{
        profilePic: 'https://steemitimages.com/0x0/http://ipfs.io/ipfs/QmTQo4cxDZ5MoszQAK93JyhFedeMuj7j4x5P7tQnvRi4A5',
        name: 'Ulisses Ferreira',
        position: 'CTO',
        bio: 'I am awesome',
        tags: ['ux', 'ul']
      }, {
        profilePic: 'https://steemitimages.com/0x0/http://ipfs.io/ipfs/QmTQo4cxDZ5MoszQAK93JyhFedeMuj7j4x5P7tQnvRi4A5',
        name: 'Ulisses',
        position: 'CTO',
        bio: 'I am awesome',
        tags: ['ux', 'ul']
      }]
    }
    /*
    console.log('http://localhost/search/' + this.props.match.params.token)
    fetch('http://localhost/search/' + this.props.match.params.token)
      .then(res => res.json())
      .then(res => {
        //Nesta resposta podemos ter erro ou então
        //um objeto user com token.
        if (res.mentors) {
          this.updateMentorsList(res.mentors)
        } else {
          //Error handling
          //TODO
        }
      })
      */
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
  }

  updateMentorsList = (listOfMentors) => {
    this.setState({
      mentors: listOfMentors
    })
  }

  searchQuery = (search) => {
    fetch('https://api.upframe.io/search/' + search)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
  }

  render () {
    return (
      <div>
        <Navbar profilePic={this.state.profilePicUrl} />
        <main id='search'>
          <div>
            <SearchBar searchQuery={this.searchQuery} />
          </div>
          <div className='results-wrapper'>
            <div className='left'>
              <MentorList mentors={this.state.mentors} />
            </div>
            <div className='right'>
              <div className='text-spotify'>Get 1 month of Spotify Premium - for free <span role='img' aria-label='high-five'>🙌</span></div>
              <div className='text-spotify-small'>Help us understand your<br /> challenges as an entrepreneur and<br /> we'll get you 1 month of Spotify<br /> Premium + exclusive access to UPF.</div>
              <button className='main fill round spotify'>Let's do it</button>
              <img className='spotify-event' src='https://preview.ibb.co/i2Lsoo/photo_2018_07_31_00_03_23.jpg' alt='spotify' />
            </div>
          </div>
        </main>
      </div>
    )
  }
}
