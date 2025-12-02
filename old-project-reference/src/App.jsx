import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from './routes/Home';

import '../server';

import './styles/index.scss';

export const App = () => {
    return (
    <Router history={createBrowserHistory()}>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </Router>
)};
