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
                <Navbar search={false} refreshSettings={this.refreshSettings}/>
                <main id="home">
                    <div className="wrapper">
                        <div className="search">
                            <h1>Connect with Mentors</h1>
                            <h2>and get your Startup growing</h2>
                            <div>
                                <input type="text" onChange={this.handleSearchChange}/>
                                <Link to={"/search/" + this.state.searchQuery} className="button">Search</Link>
                            </div>
                            {/* <button className="dark" onClick={this.search}>Search</button> */}
                            <SearchTags />
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}