import React, { Component } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import sjcl from 'sjcl'
import firebase from 'firebase'

const KeyCodes = {
  comma: 188,
  enter: 13
}

const { fetch, localStorage, alert, Headers } = window

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export default class PublicProfileTab extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bio: '',
      company: '',
      email: '',
      homepage: '',
      location: '',
      name: '',
      role: '',
      image: '',
      search_key: '',
      tags: [],
      suggestions: []
    }

    this.loadProfile()

    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  loadProfile = (sentData = undefined) => {
    if (sentData === undefined) {
      fetch('https://api.upframe.io/users/' + localStorage.getItem('token'), {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin'
      })
        .then(res => res.json())
        .catch(err => console.log('Error: ', err))
        .then(res => {
          let newState = {}
          for (let key in res) {
            if (res.hasOwnProperty(key)) {
              if (key === 'tags') {
                newState[key] = res[key].map(value => { return { id: value, text: value } })

                continue
              }
              newState[key] = res[key]
            }
          }

          this.setState(newState)
        })
    } else {
      let newState = {}
      for (let key in sentData) {
        if (sentData.hasOwnProperty(key)) {
          if (key === 'tags') {
            newState[key] = sentData[key].map(value => { return { id: value, text: value } })

            continue
          }
          newState[key] = sentData[key]
        }
      }
      alert('Info saved')
      this.setState(newState)
    }
  }

  onNameChange = (event) => { this.setState({ name: event.target.value }) }
  onLocationChange = (event) => { this.setState({ location: event.target.value }) }
  onRoleChange = (event) => { this.setState({ role: event.target.value }) }
  onCompanyChange = (event) => { this.setState({ company: event.target.value }) }
  onHomepageChange = (event) => { this.setState({ homepage: event.target.value }) }
  onBioChange = (event) => { this.setState({ bio: event.target.value }) }

  /* profile picture */
  openUploadDialog = (event) => {
    document.querySelector(".tab-content.public-profile input[type='file']").click()
  }

  uploadPhoto = (event) => {
    let file = event.target.files[0]
    let hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(localStorage.getItem('email')))

    firebase.storage().ref('profilepics/' + hash + '.jpg').put(file).then((snapshot) => {
      firebase.storage().ref('profilepics/' + hash + '.jpg').getDownloadURL().then(url => {
        this.props.refreshProfilePic(url)
      })
        .catch(error => {
          console.log(error)
          switch (error.code) {
            case 'storage/object_not_found':
            // file doesn't exist
              break

            case 'storage/unauthorized':
            // unauthorized access
              break
            case 'storage/canceled':
            // canceled upload
              break
            default:
            // unknown error
          }
        })
    }).catch((err) => {
      console.log(err)
    })
  }

  removePhoto = () => {
    firebase.storage().ref('profilepics/defaultAvatar.svg').getDownloadURL().then(url => {
      this.props.refreshProfilePic(url)

      let hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(localStorage.getItem('email')))
      firebase.storage().ref('profilepics/' + hash + '.jpg').delete().catch(err => {
        console.log('Error deleting profile picture in publicprofiletab.js', err)
      })
    })
  }

  /* Tags  -  Skills */
  handleDelete (i) {
    const { tags } = this.state
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    })
  }

  handleAddition (tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }))
  }

  handleDrag (tag, currPos, newPos) {
    const tags = [...this.state.tags]
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    // re-render
    this.setState({ tags: newTags })
  }

  /* Save new settings */
  saveChanges = (e) => {
    let reqBody = this.state
    let newTags = []

    for (let field of reqBody.tags) {
      newTags.push(field.text)
    }

    reqBody.tags = newTags
    let reqHeaders = new Headers({
      'Content-Type': 'application/json'
    })
    fetch('https://api.upframe.io/users/' + this.state.token, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(this.state),
      headers: reqHeaders,
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .catch(err => console.log('Error:', err))
      .then(result => this.loadProfile(result))
  }

  render () {
    const { tags } = this.state

    return (
      <div className='tab-content public-profile'>
        <div className='profile-pic'>
          <div>
            <img alt='profile-pic' src={this.props.profilePic} />
          </div>
          <div>
            <h1 className='regular'>Profile Picture</h1>
            <input type='file' accept='image/*' onChange={this.uploadPhoto} />
            <p className='second'>We're big on pictures around here.</p>
            <p className='second'>Add an updated picture so you don't like a <span role='img' aria-label='robot'>🤖</span></p>
            <button className='main round' onClick={this.openUploadDialog}>Upload new photo</button>
            <button className='second round' onClick={this.removePhoto}>Remove</button>
          </div>
        </div>
        <div className='profile-info'>
          <div className='field-group'>
            <p>Your name</p>
            <input className='second' type='text' onChange={this.onNameChange} value={this.state.name} />
          </div>
          <div className='field-group'>
            <p>Location</p>
            <input className='second' type='text' onChange={this.onLocationChange} value={this.state.location} />
          </div>
          <div className='field-group'>
            <p>Your position</p>
            <input className='second' type='text' onChange={this.onRoleChange} value={this.state.role} />
          </div>
          <div className='field-group'>
            <p>Company</p>
            <input className='second' type='text' onChange={this.onCompanyChange} value={this.state.company} />
          </div>
          {this.props.mentor ? (
            <div className='field-group'>
              <p>Website</p>
              <input className='second' type='text' onChange={this.onHomepageChange} value={this.state.homepage} />
            </div>
          ) : (
            <div className='field-group'>
              <p>LinkedIn page</p>
              <input className='second' type='text' onChange={this.onHomepageChange} value={this.state.homepage} />
            </div>
          )}
          <div className='field-group'>
            <p>Bio</p>
            <textarea rows='5' className='second' type='text' onChange={this.onBioChange} value={this.state.bio} />
          </div>
          <span className='hr' />
          <div className='field-group'>
            https://connect.upframe.io/people/<input>{this.state.searchKey}</input>
          </div>
          <span className='hr' />
          <div>
            <h2 className='regular'>Your skills</h2>
            <p className='second'>Add up to 7 skills to display in your profile.</p>
            <ReactTags tags={tags}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              handleDrag={this.handleDrag}
              delimiter={delimiters} />
          </div>
          <div className='save'>
            <button className='second round' onClick={this.saveChanges}>Save</button>
          </div>
        </div>
      </div>)
  }
}
