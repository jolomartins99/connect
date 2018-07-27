import React, { Component } from 'react';
import sjcl from 'sjcl';
import firebase from 'firebase';

//import MentorList from '../components/mentorlist';
import Navbar from '../components/navbar';
import SearchBar from '../components/searchbar';

export default class Search extends Component {

  constructor (props) {
    super(props)
    this.state = {
      mentors: []
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

  componentDidMount() {
    let newState = {}
    if (localStorage.getItem("email") != null) {
      let hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(localStorage.getItem("email")));
      firebase.storage().ref("profilepics/" + hash + ".jpg").getDownloadURL().then(url => {
        newState.profilePicUrl = url;
        this.setState(newState);
      })
        .catch(err => {
          firebase.storage().ref("profilepics/defaultAvatar.svg").getDownloadURL().then(url => {
            newState.profilePicUrl = url;
            this.setState(newState);
          }).catch(err => {
            console.log("MentorSettings.js : ", err);
          })
        })
    }
  }

  updateMentorsList = (listOfMentors) => {
    this.setState({
      mentors: listOfMentors
    })
  }

  render() {
    return (
      <div>
        <Navbar profilePic={this.state.profilePicUrl} />
        <main id="search">
          <div>
            <SearchBar />
          </div>
        </main>
      </div>
    );
  }
}