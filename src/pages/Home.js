import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import SearchTags from '../components/searchtags';

import MentorList from '../components/mentorlist';

export default class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
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

    render() {
        let list = [{
            name: 'Mentor1',
            position: 'CEO',
            bio: 'Batatas feias',
            tags: ['UX', 'UI'],
            profilePic: 'http://via.placeholder.com/350x350'
        }, {
            name: 'Filipa',
            position: 'CEO',
            bio: 'Batatas linda',
            tags: ['User Research', 'UI'],
            profilePic: 'http://via.placeholder.com/350x350'
        }, {
            name: 'Mário',
            position: 'CTO',
            bio: 'Eu sou o Mário',
                tags: ['UX', 'UI', 'Crowdfunding', 'Cash', 'Hello', 'Hello', 'Hello', 'Hello', 'Hello', 'Hello', 'Hello'],
            profilePic: 'http://via.placeholder.com/350x350'
        }]
        return (
            <div>
                <Navbar search={false} />
                <main id="home">
                    <div class="wrapper">
                        <div class="search">
                            <h1>Connect with Mentors</h1>
                            <h2>and get your Startup growing</h2>
                            <input type="text" onChange={this.handleSearchChange}/>
                            <Link to={"/search/" + this.state.searchQuery} class="button">Search</Link>
                            {/* <button className="dark" onClick={this.search}>Search</button> */}
                            <SearchTags />
                        </div>
                        <MentorList mentors={list}/>
                    </div>
                </main>
            </div>
        );
    }
}