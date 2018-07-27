import React, { Component } from 'react'

import PublicProfileTab from '../components/publicprofiletab'
import AccountTab from '../components/accounttab'
import SyncCalendarTab from '../components/synccalendartab'

export default class MentorSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTab: 0
    }
  }

    handlePublicProfileTab = (event) => { this.setState({ currentTab: 0 }) }

    handleAccountTab = (event) => { this.setState({ currentTab: 1 }) }

    handleSyncTab = (event) => { this.setState({ currentTab: 2 }) }

    showTab () {
      if (this.state.currentTab === 0) {
        return <PublicProfileTab />
      } else if (this.state.currentTab === 1) {
        return <AccountTab />
      } else {
        return <SyncCalendarTab />
      }
    }

    render () {
      return (
        <div>
          <h1>User Settings</h1>
        </div>
      )
    }
}
