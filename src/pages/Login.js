import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from '../components/navbar';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            email: '',
            password: '',
            type_user: 'mentor'
        }
    }

    login = () => {
        let data = {
            email: this.state.email,
            password: this.state.password,
            type_user: this.state.type_user
        }
        let fetchData = {
            method: 'POST',
            body: Object.entries(data).map(e => e.join('=')).join('&'),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }
        console.log(fetchData)
        fetch('https://api.upframe.io/users/login', fetchData)
            .then(res => res.json())
            .then(res => {
                //Nesta resposta podemos ter erro ou então
                //um objeto user com token.
                if (res.token) {
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('type_user', res.type_user);
                    localStorage.setItem('email', res.email)
                    //Optionals - Debug
                    localStorage.setItem("name", "Ulisses");
                    localStorage.setItem("location", "Lisboa");
                    localStorage.setItem("role", "CTO");
                    localStorage.setItem("company", "Upframe");
                    localStorage.setItem("homepage", "Ulisses.com");
                    localStorage.setItem("bio", "Eu sou brutal");
                    localStorage.setItem("tags", JSON.stringify([123, 123,123]));
                    localStorage.setItem("profilePicture", "data:image/jpeg;base64,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");
                    //Real
                    // localStorage.setItem("name", res.name);
                    // localStorage.setItem("location", res.location);
                    // localStorage.setItem("role", res.position);
                    // localStorage.setItem("company", res.company);
                    // localStorage.setItem("homepage", res.website);
                    // localStorage.setItem("bio", res.bio);
                    // localStorage.setItem("tags", JSON.stringify(res.tags));
                    // localStorage.setItem("profilePicture", res.image);
                    window.location.reload();
                } else {
                    //Error handling
                    //TODO
                }
                console.log(res)
            })


        console.log(this.state)
    }

    handleEmailChange = (e) => { this.setState({ email: e.target.value }) }

    handlePasswordChange = (e) => { this.setState({ password: e.target.value }) }

    handleUserTypeChange = (e) => { this.setState({ userType: e.target.value }) }

    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to="/settings" />;
        } else {
            return (
                <div>
                    <Navbar refreshSettings={this.refreshSettings}/>
                    <main id="home">
                        <h1>Welcome Mentor, login here</h1>
                        <input onChange={this.handleEmailChange} type="email" placeholder="hello@example.com" />
                        <input onChange={this.handlePasswordChange} type="password" />
                        <select onChange={this.handleUserTypeChange}>
                            <option value="user">User</option>
                            <option value="mentor">Mentor</option>
                        </select>
                        <button onClick={this.login}>Log In</button>
                    </main>
                </div>
            );
        }
    }
}