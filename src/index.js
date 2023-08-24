import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import axios from 'axios'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { takeLatest, put } from 'redux-saga/effects'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
