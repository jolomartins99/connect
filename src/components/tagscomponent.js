import React, { Component } from 'react'

export default class TagsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: [],
      newTag: ''
    }
  }

  handleTagChange = (event) => { this.setState({newTag: event.target.value}) }

  addTag = () => {
    let array = this.state.tags
    this.setState({
      tags: array.push(this.state.newTag)
    })
  }

  render () {
    console.log(this.state.tags)
    // let output = this.state.tags.map((tag) => {
    //   return <li className="mentor-tags-list-element">{tag}</li>;
    // })
    return <div>
      <ul className='mentor-card-tags'>
        {/* {output} */}
      </ul>
      <input onChange={this.handleTagChange} type='text' />
      <button onClick={this.addTag} />
    </div>
  }
}
