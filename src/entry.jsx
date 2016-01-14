import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import App from './containers/video_container.jsx';
import rootReducer from './reducers/root_reducer.jsx';


ReactDOM.render(
    <Provider store={applyMiddleware(ReduxPromise)(createStore)(rootReducer)} >
        <App />
    </Provider>
    , document.getElementById('reactAppContainer')
);