import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class SyncCalendarTab extends Component {

    constructor(props){
        super(props)
        this.state = {
            currId: 0,
            events: [{
            }]
        }
    }

    deleteEvent = (event) => {
        console.log(event)
        let listOfEvents = this.state.events
        this.setState({
            events: listOfEvents.filter(singleEvent => singleEvent.id !== event.id)
        })
    }

    addFreeSlot = (slot) => {
        let currentEvents = this.state.events
        let currentId = this.state.currId
        currentEvents.push({
            id: currentId,
            start: slot.start,
            end: slot.end,
            title: 'Upframe Free Slot'
        })
        this.setState({
            events: currentEvents,
            currId: currentId + 1
        })
    }

    render() {
        // let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
        return (
            <div className="tab-content">
                <BigCalendar
                    selectable
                    defaultDate={new Date()}
                    defaultView="week"
                    events={this.state.events}
                    onSelectEvent={event => this.deleteEvent(event)}
                    onSelectSlot={slot => this.addFreeSlot(slot)}
                />
            </div>
        );
    }
}