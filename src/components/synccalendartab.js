import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

export default class SyncCalendarTab extends Component {

    constructor(props){
        super(props)
        this.state = {
            events: [{
                id: 0,
                title: 'All Day Event very long title',
                allDay: true,
                start: new Date(2015, 3, 0),
                end: new Date(2015, 3, 1),
            },
            {
                id: 1,
                title: 'Long Event',
                start: new Date(2015, 3, 7),
                end: new Date(2015, 3, 10),
            }]
        }
        BigCalendar.momentLocalizer(moment); 
    }

    syncGoogle = () => {

    }

    render() {
        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
        return (
            <div className="calendar">
                <button onClick={this.syncGoogle}>Sync with Google</button>
                <BigCalendar
                    selectable
                    events={this.state.events}
                    startAccessor='startDate'
                    endAccessor='endDate'
                />
            </div>

        );
    }
}