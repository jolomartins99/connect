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
            calendarNames: [],
            token: '',
            refreshToken: '',
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
        console.log('We got called')
    }

    calendarList() {
        let customHeaders = new Headers();
        customHeaders.append("Authorization", "Bearer " + this.state.token);

        return (fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList",
            {
                method: "GET",
                mode: "cors",
                headers: customHeaders
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data.error && data.error.code === 401) { // Invalid credentials / invalid token
                    let error = { error: 401, message: data.error.message };
                    throw error;
                }
                console.log(data)
                return data;
            }))
    }

    getCalendarList() {
        let promise = this.calendarList(),
        newCalendarMap = { calendarNames: [] };
        promise.then(data => {
            for (let calendar of data.items) {
                newCalendarMap.calendarNames.push([calendar.id, calendar.summary]);
            }
            console.log('Mapa' + newCalendarMap)
            this.setState(newCalendarMap);
        }).catch(err => {
            // let's recommend unlink + link
            console.log(err);
            //alert("We highly recommend linking your account again");
            //this.googleUnlink();
        });
    }

    googleLink = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        
        provider.addScope("email");
        provider.addScope("profile");
        //provider.addScope("https://www.googleapis.com/auth/admin.directory.resource.calendar");
        provider.addScope("https://www.googleapis.com/auth/calendar");
        
        // display browser default language
        firebase.auth().useDeviceLanguage();
        
        provider.setCustomParameters({
            "access_type": "offline",
            "prompt": "consent"
        });

        firebase.auth().signInWithPopup(provider).then(result => {
            console.log(result)
            this.setState({
                token: result.credential.accessToken,
                refreshToken: result.user.refreshToken
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        if (this.state.token) {
           this.calendarList()
        }
        return (
            <div className="tab-content calendar-sync">
                { this.state.token === '' ? (
                    <div>

                    <button className="main" onClick={this.googleLink}>Sync with Google Calendar</button>
                    <BigCalendar
                        selectable
                        defaultDate={new Date()}
                        defaultView="week"
                        events={this.state.events}
                        onSelectEvent={event => this.deleteFreeSlot(event)}
                        onSelectSlot={slot => this.addFreeSlot(slot)}
                    />
                    </div>
                ) : (
                    <div>
                        You are synced with access: {this.state.token} and {this.state.refreshToken}
                        {this.showCalendars()}
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