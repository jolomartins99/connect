import React, { Component } from 'react';
import MentorList from '../components/mentorlist';
import Navbar from '../components/navbar';

export default class Search extends Component {

  constructor (props) {
    super(props)
    this.state = {
      mentors: []
    }
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

  }

  updateMentorsList = (listOfMentors) => {
    this.setState({
      mentors: listOfMentors
    })
  }

  render() {
    return (
      <div>
        <Navbar search={true} />
        <MentorList mentors={this.state.mentors} />
      </div>
    );
  }
}