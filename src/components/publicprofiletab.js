import React, { Component } from 'react';

class PublicProfileTab extends Component {

    constructor (props) {
        super(props);
        this.state = {
            location: '',
            role: '',
            company: '',
            homepage: '',
            bio: ''
        };
    }

    onNameChange = (event) => { this.setState({ name: event.target.value }) }
    onLocationChange = (event) => { this.setState({ location: event.target.value }) }
    onRoleChange = (event) => { this.setState({ role: event.target.value }) }
    onCompanyChange = (event) => { this.setState({ company: event.target.value }) }
    onHomepageChange = (event) => { this.setState({ homepage: event.target.value }) }
    onBioChange = (event) => { this.setState({ bio: event.target.value }) }

    render() {
        return (
            <div className="tab publicprofile" id="settings">
                <div className="edit-profile">
                    <div id="left">
                        <form onSubmit={this.handleSubmit}>
                            <h1>Public Profile</h1>
                            <label>Name</label>
                            <input name='text' onChange={this.onNameChange} value={this.state.name || ''} type='text' />
                            <label>Location</label>
                            <input name='text' onChange={this.onLocationChange} value={this.state.location || ''} type='text' />
                            <label>Role</label>
                            <input name='text' onChange={this.onRoleChange} value={this.state.role || ''} type='text' />
                            <label>Company</label>
                            <input name='text' onChange={this.onCompanyChange} value={this.state.company || ''} type='text' />
                            <label>Homepage (URL)</label>
                            <input name='text' onChange={this.onHomepageChange} value={this.state.homepage || ''} type='text' />
                            <label>Bio</label>
                            <textarea name='text' onChange={this.onBioChange} value={this.state.bio || ''} rows="5" cols="50" />
                            <input value='Save' type='submit' />
                        </form>
                    </div>
                    <div id="right">
                        <div>
                            <form id="profilepic" encType="multipart/form-data">
                                <img alt="Profile pic" width="200" height="200" src={this.state.pic}></img>
                                <input type="file" accept="image/*" onChange={this.uploadPhoto} />
                                <input type="button" id="upload" value="Upload" onClick={this.choosePhoto} />
                                <input type="button" id="remove" value="Remove" onClick={this.removePhoto} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PublicProfileTab