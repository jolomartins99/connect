import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import SearchTags from '../components/searchtags';

import MentorList from '../components/mentorlist';

export default class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            reload: true,
            searchQuery: ''
        }
    }

        signup = () => {
            let data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                passwordConfirmation: this.state.passwordConfirmation,
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
            fetch('http://localhost/users/', fetchData)
                .then(res => res.json())
                .then(res => {
                    //Nesta resposta podemos ter erro ou então
                    //um objeto user com token.
                    if (res.token) {
                        localStorage.setItem('token', res.token)
                    } else {
                        //Error handling
                        //TODO
                    }
                    console.log(res)
                })
    }

    handleSearchChange = (e) => { this.setState({ searchQuery: e.target.value }) }

    refreshSettings = () => {
        this.setState({
            reload: !this.state.reload
        })
    }

    render() {
        return (
            <div>
                <Navbar refreshSettings={this.refreshSettings}/>
                <main id="home">
                    <div className="wrapper">
                        <div id="intro">
                            <p>Hello! Connect with mentors and get your startup growing</p>
                        </div>
                        <div className="search">
                            <div>
                                <input placeholder="Try looking for a topic, a person or a company..." type="text" onChange={this.handleSearchChange}/>
                            </div>
                            <SearchTags />
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}