import React, { Component } from 'react';

export default class MentorList extends Component {

  constructor(props){
    super(props);
    this.state = {
      mentors: props.mentors
    }
  }

  //We turn it into a tag too
  mentorTagsToElement = (tags) => {
    return tags.map(tag => {
      return (
        <li className="mentor-tags-list-element">{tag}</li>
      )
    })
  }

  mentorToElement = (mentor) => { //We turn it into an element and for each expertise tag
    return (
      <div className="mentor-card">
        <img className="mentor-card-image" src={mentor.profilePic}></img>
        <div className="mentor-card-info">
          <p>Name: {mentor.name}</p>
          <p>Position: {mentor.position}</p>
          <p>Bio: {mentor.bio}</p>
          <p>Tags:
          <ul className="mentor-tags-list">
              {this.mentorTagsToElement(mentor.tags)}
            </ul>
          </p>
        </div>
      </div>
    )
  }

  render() { //For each mentor...
    return (
      <div>
        {this.state.mentors.map(mentor => {
          return this.mentorToElement(mentor)
        })}
      </div>
    );
  }
}