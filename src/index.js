import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MentorSettings from './pages/MentorSettings';

// Do not forget to read https://reacttraining.com/react-router/web/example/auth-workflow
// If you need any help with routing. Don't follow online tutorials, most of them
// are outdated
ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />

            <Route exact path='/mentor' component={MentorSettings} />
        </div>
    </Router>, 
    document.getElementById('root')
);
registerServiceWorker();
