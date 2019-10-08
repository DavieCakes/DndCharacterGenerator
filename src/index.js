import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'semantic-ui-css/semantic.min.css'

import { Provider } from 'react-redux'
// import configureStore from './store/configureStore'
// import { createBrowserHistory } from 'history'

import store from './store/configureStore'

// create browser history to use in the redux store
// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')
// const history = createBrowserHistory()

// get application-wide store instance,
// populate with state from the server where available
// const initialState = window.initialReduxState;
// const store = configureStore(history, initialState)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
