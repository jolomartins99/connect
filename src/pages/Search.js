import React, { Component } from 'react';
import MentorList from '../components/mentorlist';

export default class Search extends Component {

  constructor (props) {
    super(props)
    fetch('http://localhost/search/' + this.props.match.params.token)
      .then(res => res.json())
      .then(res => {
        //Nesta resposta podemos ter erro ou então
        //um objeto user com token.
        if (res.mentors) {
          this.state = {
            mentors: res.mentors
          }
        } else {
          //Error handling
          //TODO
        }
      })
  }

  render() {
    return (
      <MentorList mentors={this.state.mentors} />
    );
  }
}