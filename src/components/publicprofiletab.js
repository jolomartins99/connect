import React, { Component } from 'react';
import TagsComponent from '../components/tagscomponent';

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
            name: localStorage.getItem('name')
        };
    }

    onNameChange = (event) => { this.setState({ name: event.target.value }) }
    onLocationChange = (event) => { this.setState({ location: event.target.value }) }
    onRoleChange = (event) => { this.setState({ role: event.target.value }) }
    onCompanyChange = (event) => { this.setState({ company: event.target.value }) }
    onHomepageChange = (event) => { this.setState({ homepage: event.target.value }) }
    onBioChange = (event) => { this.setState({ bio: event.target.value }) }

    saveChanges = () => {
       console.log(this.state) 
    }

    updatePhoto = () => {

    }

    removePhoto = () => {
        
    }

    render() {
        return <div className="tab-content">
            <div className="profile-pic">
              <img alt="profile-pic" src={this.state.image} />
              <button onClick={this.updatePhoto}>Update</button>
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
                <TagsComponent />
              <button onClick={this.saveChanges}>Save Changes</button>
            </div>
          </div>;
    }
}