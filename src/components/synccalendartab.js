import React, { Component } from 'react';

export default class SyncCalendarTab extends Component {

    syncGoogle = () => {

    }

    render() {
        return (
            <div className="tab-content">
                <button onClick={this.syncGoogle}>Sync with Google</button>
            </div>

        );
    }
}