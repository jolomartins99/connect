import React, { Component } from 'react';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import PublicProfileTab from '../components/publicprofiletab';
import AccountTab from '../components/accounttab';
import SyncCalendarTab from '../components/synccalendartab';

export default class MentorSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0
        }
    }

    handlePublicProfileTab = (event) => { this.setState({ currentTab: 0 }) }

    handleAccountTab = (event) => { this.setState({ currentTab: 1 }) }

    handleSyncTab = (event) => { this.setState({ currentTab: 2 }) }

    showTab() {
        if (this.state.currentTab === 0) {
            return <PublicProfileTab />
        } else if (this.state.currentTab === 1) {
            return <AccountTab />
        } else {
            return <SyncCalendarTab />
        }
    }

    render() {
        let firstButton = 'tab-button' + (this.state.currentTab === 0 ? ' active' : '');
        let secondButton = 'tab-button' + (this.state.currentTab === 1 ? ' active' : '');
        let thirdButton = 'tab-button' + (this.state.currentTab === 2 ? ' active' : '');
        return (
            <div>
                <Navbar refreshSettings={this.props.refreshSettings}/>
                <main id="mentor-settings">
                    <div className="wrapper">
                        <div className="tab-list">
                            <button className={firstButton} onClick={this.handlePublicProfileTab}>Public Profile</button>
                            <button className={secondButton} onClick={this.handleAccountTab}>Account</button>
                            <button className={thirdButton} onClick={this.handleSyncTab}>Sync</button>
                        </div>
                        {this.showTab()}
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}