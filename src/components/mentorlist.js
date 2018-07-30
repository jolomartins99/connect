import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class MentorList extends Component {
  constructor (props) {
    super(props)
    console.log(this.props.mentors)
    this.state = {
      mentors: this.props.mentors
    }
  }

  // We turn it into a tag too. We only show 2 of these tags. We need to find a way
  // to limit the number of chars to make sure that the tags don't go below
  //
  mentorTagsToElement = (tags) => {
    return tags.map(tag => {
      return (
        <li className='mentor-tags-list-element'>{tag}</li>
      )
    })
  }

  mentorToElement = (mentor) => { // We turn it into an element and for each expertise tag
    return (
      <Link to={'/people/' + this.getMentorLink(mentor.name)}>
        <div className='mentor-card'>
          <img className='mentor-card-image' src={mentor.profilePic} alt='upframe mentor' />
          <div className='mentor-card-info'>
            <p><strong>{mentor.name}</strong></p>
            <p>{mentor.position}</p>
            <p>{mentor.bio}</p>
          </div>
          <ul className='mentor-card-tags'>
            {this.mentorTagsToElement(mentor.tags)}
          </ul>
        </div>
      </Link>
    )
  }

  getMentorLink = (name) => {
    return name.toLowerCase().replace(' ', '')
  }

  render () { // For each mentor...
    return (
      <div>
        {this.state.mentors.map(mentor => {
          return this.mentorToElement(mentor)
        })}
      </div>
    )
  }
}
