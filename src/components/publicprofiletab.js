import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import sjcl from 'sjcl';
import firebase from 'firebase';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class PublicProfileTab extends Component {

  constructor (props) {
    super(props);

    this.state = {
      bio: "",
      company: "",
      email: "",
      homepage: "",
      location: "",
      name: "",
      role: "",
      image: "",
      tags: [],
      suggestions: []
    }

    this.loadProfile();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

  }

  loadProfile = (data = undefined) => {
    if(data == undefined) {
      fetch("https://api.upframe.io/users/" + localStorage.getItem("token"), {
        method: "GET",
        mode: "cors",
        credentials: "same-origin"
      })
      .then(res => res.json())
      .catch(err => console.log("Error: ", err))
      .then(res => {
        let newState = {};
        for(let key in res) {
          if(res.hasOwnProperty(key)) {
            if(key == "tags") {
              if(JSON.parse(res[key]).tags == "") continue;

              let tagList = new Array();

              JSON.parse(res[key]).tags.map((value, index) => {
                tagList.push({id: value, text: value})
              });

              newState[key] = tagList;
              continue;
            }
            newState[key] = res[key];
          }
        }
        newState.imageHash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(res.email));
        
        this.setState(newState, this.loadPhoto);
      })
    } else {
      let newState = {};
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          if (key == "tags") {
            if(JSON.parse(data[key]).tags == "") continue;

            let tagList = new Array();
            JSON.parse(data[key]).tags.map((value, index) => {
              tagList.push({ id: value, text: value })
            });

            newState[key] = tagList;
            continue;
          }
          newState[key] = data[key];
        }
      }
      newState.imageHash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(data.email));

      this.setState(newState, this.loadPhoto);
    }
    
  }

  onNameChange = (event) => { this.setState({ name: event.target.value }) }
  onLocationChange = (event) => { this.setState({ location: event.target.value }) }
  onRoleChange = (event) => { this.setState({ role: event.target.value }) }
  onCompanyChange = (event) => { this.setState({ company: event.target.value }) }
  onHomepageChange = (event) => { this.setState({ homepage: event.target.value }) }
  onBioChange = (event) => { this.setState({ bio: event.target.value }) }

  /* profile picture */
  openUploadDialog = (event) => {
    document.querySelector(".tab-content.public-profile input[type='file']").click();
  }

  uploadPhoto = (event) => {
    let file = event.target.files[0],
        hash = this.state.image;
    
    firebase.storage().ref("profilepics/" + hash + ".jpg").put(file).then((snapshot) => {
      firebase.storage().ref("profilepics/" + hash + ".jpg").getDownloadURL().then(url => {
        localStorage.setItem("profilePicture", url);
        this.setState({image: url});
      })
      .catch(error => {
        switch (error.code) {
          case "storage/object_not_found":
            // file doesn't exist
            break;

          case "storage/unauthorized":
            // unauthorized access
            break;
          case "storage/canceled":
            // canceled upload
            break; 
          default:
            // unknown error
        }
      })
    }).catch((err) =>  {
      console.log(err);
    })
  }

  loadDefaultPhoto = () => {
    firebase.storage().ref("profilepics/defaultAvatar.svg").getDownloadURL().then(url => {
      this.setState({
        image: url
      })
    })
  }

  loadPhoto = () => {
    firebase.storage().ref("profilepics/" + this.state.imageHash + ".jpg").getDownloadURL().then(url => {
      let newState = {};
      newState.image = url;
      localStorage.setItem("profilePicture", url);
      this.setState(newState);
    })
    .catch(error => {
      console.log("error");
      console.log(error);
      switch(error.code) {
        case 'storage/object-not-found':
          // file doesn't exist
          this.loadDefaultPhoto();
          break;
      }
    })
  }

  /* Tags  -  Skills */
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

  /* Save new settings */
  saveChanges = (e) => {
    let reqBody = this.state,
        newTags = [];

    for(let field of reqBody.tags) {
      newTags.push(field.text);
    }
    reqBody.tags = {"tags": newTags};
    

    let reqHeaders = new Headers({
      "Content-Type": "application/json"
    })
    fetch("https://localhost:8080/users/" + this.state.token, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(this.state),
      headers: reqHeaders,
      credentials: "same-origin"
    })
    .then(res => res.json())
    .catch(err => console.log("Error:", err))
    .then(result => this.loadProfile(result));
  }

    render() {
      const {tags} = this.state;

      return (
        <div className="tab-content public-profile">
          <div className="profile-pic">
            <div>
              <img alt="profile-pic" src={this.state.image} />
            </div>
            <div>
              <h1>Profile Picture</h1>
              <input type="file" accept="image/*" onChange={this.uploadPhoto} />
              <p className="second">We're big on pictures around here.</p>
              <p className="second">Add an updated picture so you don't like</p>
              <button className="main round" onClick={this.openUploadDialog}>Upload new photo</button>
              <button className="second round" onClick={this.loadDefaultPhoto}>Remove</button>
            </div>
          </div>
          <div className="profile-info">
            <div className="field-group">
              <p>Your name</p>
              <input className="second" type="text" onChange={this.onNameChange} value={this.state.name} />
            </div>
            <div className="field-group">
              <p>Location</p>
              <input className="second" type="text" onChange={this.onLocationChange} value={this.state.location} />
            </div>
            <div className="field-group">
              <p>Your position</p>
              <input className="second" type="text" onChange={this.onRoleChange} value={this.state.role} />
            </div>
            <div className="field-group">
              <p>Company</p>
              <input className="second" type="text" onChange={this.onCompanyChange} value={this.state.company} />
            </div>
            <div className="field-group">
              <p>Website</p>
              <input className="second" type="text" onChange={this.onHomepageChange} value={this.state.homepage} />
            </div>
            <div className="field-group">
              <p>Bio</p>
              <textarea rows="5" className="second" type="text" onChange={this.onBioChange} value={this.state.bio} />
            </div>
            <span className="hr"></span>
            <div>
              <h2>Your skills</h2>
              <p className="second">Add up to 7 skills to display in your profile.</p>
              <ReactTags tags={tags}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
                delimiter={delimiters} />
            </div>
            <div className="save">
              <button className="second round" onClick={this.saveChanges}>Save</button>
            </div>
          </div>
        </div>)
    }
}