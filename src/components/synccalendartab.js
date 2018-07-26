import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

import firebase from 'firebase';

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

    googleLink = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        
        provider.addScope("email");
        provider.addScope("profile");
        provider.addScope("https://www.googleapis.com/auth/admin.directory.resource.calendar");
        
        // display browser default language
        firebase.auth().useDeviceLanguage();
        
        provider.setCustomParameters({
            "access_type": "offline"
        });

        firebase.auth().signInWithPopup(provider).then(result => {
            /**
             * Access token - Used for API requests
             */
            let accessToken = result.credential.accessToken;
            console.log("accessToken:\n", accessToken);
            /**
             * Refresh token - Used to get a new access token
             */
            let refreshToken = result.user.refreshToken;
            console.log("refreshToken:\n", refreshToken);
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="tab-content calendar-sync">
                { this.state.syncStatus === 0 ? (
                    <button className="main" onClick={this.googleLink}>Sync with Google Calendar</button>
                ) : (
                    <div>
                    
                    </div>
                )}
            </div>
        );
        /*
        if (this.state.syncStatus === 0) {
            //Ainda não foi visto synced
        } else {
            //Já foi feito o login. Temos acesso a um token
            //Temos que ir buscar a lista de calendarios
            return (
                <div className="tab-content">
                    <div>
                        <div>
                            {this.showCalendars()}
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
                </div>
            )
        }*/
    }
}