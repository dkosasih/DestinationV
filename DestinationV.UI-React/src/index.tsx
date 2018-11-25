import 'bootstrap3/dist/css/bootstrap-theme.css';
import 'bootstrap3/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { doRoutes } from './app';
import * as serviceWorker from './serviceWorker';
import { compose, applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers, { RootState } from './reducers';
import epics from './epics';
import { Provider } from 'react-redux';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

function configureStore(initialState?: RootState) {
    // configure middlewares
    const epicMiddleware = createEpicMiddleware();
    const middlewares = [epicMiddleware];

    // compose enhancers
    const enhancer = composeEnhancers(applyMiddleware(...middlewares));

    // create store
    const localStore = createStore(reducers, initialState, enhancer);

    epicMiddleware.run(epics);

    return localStore;
}

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>{doRoutes()}</Provider>,
    document.getElementById('root') as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
