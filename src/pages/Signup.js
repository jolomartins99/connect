import React, { Component } from 'react';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            email : '',
            password : '',
            passwordConfirmation : ''
        }
    }

    postData = (url = ``, data = {}) => {
    // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => response.json()) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
    };

    signup = () => {

        alert('going for it')

        this.postData(`http://http://api-env.882xcpbbwf.eu-west-2.elasticbeanstalk.com//users`, { answer: 42 })
            .then(data => console.log(data)) // JSON from `response.json()` call
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                <p>Hello! Welcome to our platform. What can we call you?</p>
                <input type="text" value="name" />
                <p>Whats your email?</p>
                <input type="email" value="email@example.com" />
                <p>Write your password</p>
                <input type="password" />
                <p>Write your password (again)</p>
                <input type="password" />
                <button onClick={this.signup}>Submit</button>
            </div>
        );
    }
}

export default Signup