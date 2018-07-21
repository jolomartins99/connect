import React, { Component } from 'react';

import Navbar from '../components/navbar';
import SearchTags from '../components/searchtags';

import MentorList from '../components/mentorlist';

export default class Home extends Component {

    search = () => {
    }

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
            tags: ['UX', 'UI', 'Crowdfunding', 'Cash'],
            profilePic: 'http://via.placeholder.com/350x350'
        }]
        return (
            <div>
                <Navbar />
                <div class="search">
                    <h1>What can we help you with?</h1>
                    <input type="text" />
                    <button className="dark" onClick={this.search}>Search</button>
                    <SearchTags />
                </div>
                <MentorList mentors={list}/>
            </div>
        );
    }
}