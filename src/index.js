import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RouteModule from './containers/route';
import configureStore from './store/store';

const initialState = {};

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <RouteModule />
    </Provider>,
    document.getElementById('app'),
);
