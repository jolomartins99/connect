import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import firebase from 'firebase';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Search from './pages/Search';

// Do not forget to read https://reacttraining.com/react-router/web/example/auth-workflow
// If you need any help with routing. Don't follow online tutorials, most of them
// are outdated
ReactDOM.render(
    <Router>
        <div>
            {/*<Route exact path='/' component={Home} />*/}
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />

            {/*
                <Route path='/search' component={Search} />
            */}
            {/* Temporary */}
            <Route exact path='/' component={Search} />
            <Route exact path='/settings' component={Settings} />
        </div>
    </Router>, 
    document.getElementById('root')
);

const config = {
    apiKey: "AIzaSyB8x5WHsTP7DMoaqo5KDJ0KmZkFWub68s4",
    authDomain: "upframeconnect.firebaseapp.com",
    databaseURL: "https://upframeconnect.firebaseio.com",
    projectId: "upframeconnect",
    storageBucket: "upframeconnect.appspot.com",
    messagingSenderId: "673573936602"
};
  
firebase.initializeApp(config);
registerServiceWorker();
