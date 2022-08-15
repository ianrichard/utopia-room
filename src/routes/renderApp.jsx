import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/index.scss';

const renderApp = (App, routeName) => {
    // TODO - hack because webpack is including both scripts in the page
    // need to figure this out there
    // const isFrame = window.location.pathname.includes('/frame');
    // if ((isFrame && routeName === 'home') || (!isFrame && routeName === 'frame')) {
    //     return;
    // }
    ReactDOM.render(<App />, document.getElementById('app'));
}

export default renderApp;