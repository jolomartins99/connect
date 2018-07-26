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
    apiKey: "AIzaSyBSxeo5ZG_tCwtM_gWAPMr12xUuQZg04do",
    authDomain: "upframe-mvp.firebaseapp.com",
    databaseURL: "https://upframe-mvp.firebaseio.com",
    projectId: "upframe-mvp",
    storageBucket: "upframe-mvp.appspot.com",
    messagingSenderId: "382317917178"
};
  
firebase.initializeApp(config);
registerServiceWorker();
