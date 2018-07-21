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
            tags: ['UX', 'UI']
        }, {
            name: 'Mentor2',
            position: 'CEO',
            bio: 'Batatas feias',
            tags: ['UX', 'UI']
        }, {
            name: 'Mentor3',
            position: 'CEO',
            bio: 'Batatas feias',
            tags: ['UX', 'UI']
        }]
        return (
            <div>
                <Navbar search={false} />
                <main>
                    <div class="wrapper">
                        <div class="search">
                            <h1>What can we help you with?</h1>
                            <input type="text" />
                            <button className="dark" onClick={this.search}>Search</button>
                            <SearchTags />
                        </div>
                        <MentorList mentors={list}/>
                    </div>
                </main>
            </div>
        );
    }
}