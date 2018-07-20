import React, { Component } from 'react';

export default class MentorList extends Component {

  constructor(props){
    super(props);
    this.state = {
      mentors: props.list
    }
  }

  componentDidMount = () => {
    console.log(this.state.mentors)
  }

  render() {
    return (
      <div>
        <h1>Batata</h1>
      </div>
    );
  }
}