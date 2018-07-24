import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class PublicProfileTab extends Component {

    constructor (props) {
        super(props);

        this.state = {
            image: localStorage.getItem('profilePicture'),
            location: localStorage.getItem('location'),
            role: localStorage.getItem('role'),
            company: localStorage.getItem('company'),
            homepage: localStorage.getItem('homepage'),
            bio: localStorage.getItem('bio'),
            name: localStorage.getItem('name'),
          tags: [
          ],
          suggestions: [
            // { id: 'USA', text: 'USA' },
            // { id: 'Germany', text: 'Germany' },
            // { id: 'Austria', text: 'Austria' },
            // { id: 'Costa Rica', text: 'Costa Rica' },
            // { id: 'Sri Lanka', text: 'Sri Lanka' },
            // { id: 'Thailand', text: 'Thailand' }
          ]

        };
      this.handleDelete = this.handleDelete.bind(this);
      this.handleAddition = this.handleAddition.bind(this);
      this.handleDrag = this.handleDrag.bind(this);

    }

    onNameChange = (event) => { this.setState({ name: event.target.value }) }
    onLocationChange = (event) => { this.setState({ location: event.target.value }) }
    onRoleChange = (event) => { this.setState({ role: event.target.value }) }
    onCompanyChange = (event) => { this.setState({ company: event.target.value }) }
    onHomepageChange = (event) => { this.setState({ homepage: event.target.value }) }
    onBioChange = (event) => { this.setState({ bio: event.target.value }) }

    saveChanges = () => {
      let data = {
        image: this.state.image,
        location: this.state.location,
        role: this.state.role,
        company: this.state.company,
        homepage: this.state.homepage,
        bio: this.state.bio,
        name: this.state.name,
        tags: JSON.stringify(this.state.tags)
      }
      let fetchData = {
        method: 'PUT',
        body: Object.entries(data).map(e => e.join('=')).join('&'),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }
      console.log(fetchData)
      fetch('http://api.upframe.io/users/' + localStorage.getItem('token'), fetchData)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            alert(res.message)
          } else {
            alert('All information saved successfully"!')
          }
        })
       console.log(this.state) 
    }

    uploadPhoto = (event) => {
      console.log(event.target.value)
        this.setState({
          image: event.target.value
        })
    }

    removePhoto = () => {
        this.setState({
          image: 'data:image/jpeg;base64,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'
        })
    }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

    render() {
      const {tags, delimiters} = this.state;
        return <div className="tab-content">
            <div className="profile-pic">
              
              <img alt="profile-pic" src={this.state.image} />
              <input type="file" accept="image/*" onChange={this.uploadPhoto} />
              <button onClick={this.removePhoto}>Remove</button>
            </div>
            <div className="profile-info">
              <div>
                Your name
                <input type="text" onChange={this.onNameChange} value={this.state.name} />
              </div>
              <div>
                Location
                <input type="text" onChange={this.onLocationChange} value={this.state.location} />
              </div>
              <div>
                Current Position
                <input type="text" onChange={this.onRoleChange} value={this.state.role} />
              </div>
              <div>
                Company
                <input type="text" onChange={this.onCompanyChange} value={this.state.company} />
              </div>
              <div>
                Website
                <input type="text" onChange={this.onHomepageChange} value={this.state.homepage} />
              </div>
              <div>
                Bio
                <input type="text" onChange={this.onBioChange} value={this.state.bio} />
              </div>
              <ReactTags tags={tags}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
                delimiter={delimiters} />
              <button onClick={this.saveChanges}>Save Changes</button>
            </div>
          </div>;
    }
}