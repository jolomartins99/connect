import React, { Component } from 'react'

import SearchTags from './searchtags'
// import MentorList from './mentorlist'

export default class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      mentors: [{
        profilePic: 'https://steemitimages.com/0x0/http://ipfs.io/ipfs/QmTQo4cxDZ5MoszQAK93JyhFedeMuj7j4x5P7tQnvRi4A5',
        name: 'Ulisses',
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
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Fazemos a search e no fim
      this.props.searchQuery(event.target.value)
    }
  }

  render () {
    if (!this.props.display) return null

    return (
      <div className='search-bar'>
        <div>
          <input placeholder='Try looking for a topic, a person or a company...' type='text' onKeyPress={this.handleKeyPress} />
          <button className={this.props.buttonClass}>Search</button>
        </div>
        <SearchTags />
        {/* <MentorList mentors={this.state.mentors}/> */}
      </div>
    )
  }
}

SearchBar.defaultProps = {
  display: true,
  buttonClass: 'main fill'
}
