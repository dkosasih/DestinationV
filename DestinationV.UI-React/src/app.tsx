import React from 'react';
import { Router as Router, Route } from 'react-router-dom';
import TitleBar from './TitleBar';
import RouteList from './routes-module/components/route-list/RouteList';
import logo from './logo.svg';

import { History } from 'history';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();
export interface BrowserHistory {
    history?: History;
}

export const doRoutes = () => {
    return (
        <Router history={history}>
            <div>
                <div className="container">
                    <Route path="/" render={props => <TitleBar {...props} />} />
                </div>
                <div className="container">
                    <Route path='/routes' render={(props) => <RouteList {...props} />} />
                    <Route exact path="/" render={() =>
                        <div className="App">
                            <header className="App-header">
                                <img src={logo} className="App-logo" alt="logo" />
                                <p>
                                    Edit <code>src/app.tsx</code> and save to reload.
                                </p>
                                <a
                                    className="App-link"
                                    href="https://reactjs.org"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Learn React
                                </a>
                            </header>
                        </div>}
                    />
                </div>
            </div>
        </Router>
    );
};
