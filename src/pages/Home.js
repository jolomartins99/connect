import React, { Component } from 'react';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import SearchBar from '../components/searchbar';
import SearchTags from '../components/searchtags';

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
        fetch('https://api.upframe.io/users/', fetchData)
            .then(res => res.json())
            .then(res => {
                //Nesta resposta podemos ter erro ou então
                //um objeto user com token.
                if (res.token) {
                    localStorage.setItem('token', res.token)
                    window.location.reload();
                } else {
                    alert('Could not signup')
                }
                console.log(res)
            })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <main id="home">
                    <div className="wrapper">
                        <div id="intro">
                            <p className="intro">Hello! Connect with mentors and get your startup growing</p>
                        </div>
                        <div className="search">
                            <SearchBar />
                            <SearchTags />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}