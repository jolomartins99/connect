import React, { Component } from 'react'
import {Link} from 'react-router-dom'

const { localStorage } = window

export default class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: (!!localStorage.getItem('token'))
    }
  }

    handleLogout = () => {
      localStorage.clear()
      window.location.reload()
    }

    handleDropdown = () => {
      if (document.querySelector('nav .profile #dropdown').classList.contains('show')) {
        document.querySelector('nav .profile #dropdown').classList.remove('show')
      } else document.querySelector('nav .profile #dropdown').classList.add('show')
    }

    render () {
      let login

      if (this.props.loginButton) {
        login = <Link to='/login' className='button'>Login</Link>
      }
      return (
        <div>
          <nav>
            <div className='wrapper'>
              <div className='logo'>
                <Link to='/'><img src='/media/logotype.svg' alt='' /></Link>
              </div>
              { this.state.loggedIn ? (
                <div className='profile'>
                  <div>
                    <img id='profile' src={this.props.profilePic} alt='profile-pic' onClick={this.handleDropdown} />
                    <div id='dropdown'>
                      <Link to='/settings'>Settings</Link>
                      <button onClick={this.handleLogout}>Logout</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='login'>
                  {login}
                </div>
              )}
            </div>
          </nav>
        </div>
      )
    }
}

Navbar.defaultProps = {
  loginButton: true
}
