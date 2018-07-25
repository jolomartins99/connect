import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import GoogleLogin from 'react-google-login';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class SyncCalendarTab extends Component {

    constructor(props){
        super(props)
        this.state = {
            currId: 0,
            events: [],
            syncStatus: 0 //localStorage.getItem('syncStatus')
        }
    }

    deleteFreeSlot = (event) => {
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

    saveFreeFlots = () => {
        //Vamos tentar fazer isto sempre que adicionamos um
    }

    syncWithGoogle = () => {

    }

    showCalendars = () => {

    }

    responseGoogle = (response) => {
        console.log(response);
    }

    render() {
        // let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
        if (this.state.syncStatus === 0) {
            //Ainda não foi visto synced
            return (
                <GoogleLogin
                    clientId="673573936602-l44mdj79hsmpimil0s7ui8llo4lm20pv.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                /> 
            )
        } else {
            //Já foi feito o login. Temos acesso a um token
            //Temos que ir buscar a lista de calendarios
            return (
                <div className="tab-content">
                    <div>
                        {this.showCalendars()}
                        Aqui vai estar a lista de calendarios
                    </div>
                    <BigCalendar
                        selectable
                        defaultDate={new Date()}
                        defaultView="week"
                        events={this.state.events}
                        onSelectEvent={event => this.deleteFreeSlot(event)}
                        onSelectSlot={slot => this.addFreeSlot(slot)}
                    />
                </div>
            )
        }
    }
}