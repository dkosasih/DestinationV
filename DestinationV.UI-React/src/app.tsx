import React from 'react';
import { Router as Router, Route } from 'react-router-dom';
import TitleBar from './TitleBar';
import RouteList from './routes-module/components/route-list/RouteList';
import logo from './logo.svg';

import { getTheme } from './theme';

import { History } from 'history';
import createHistory from 'history/createBrowserHistory';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    typography: {
      "useNextVariants": true,
    },
    "palette": {
        "type": "dark",
        "common": { "black": "#000", "white": "#fff" },
        "primary": { "light": "rgba(167, 71, 195, 1)", "main": "rgba(137, 50, 157, 1)", "dark": "rgba(95, 32, 106, 1)", "contrastText": "#fff" },
        "secondary": { "light": "rgba(195, 189, 191, 1)", "main": "rgba(133, 131, 130, 1)", "dark": "rgba(88, 87, 87, 1)", "contrastText": "#fff" },
        "error": { "light": "#e57373", "main": "#f44336", "dark": "#d32f2f", "contrastText": "#fff" },
        "text": { "primary": "rgba(0, 0, 0, 0.87)", "secondary": "rgba(0, 0, 0, 0.54)", "disabled": "rgba(0, 0, 0, 0.38)", "hint": "rgba(0, 0, 0, 0.38)" }
    },
});

export const history = createHistory();
export interface BrowserHistory {
    history?: History;
}
  
export const doRoutes = () => {
    return (
        <Router history={history}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <div>
                    <div className="container">
                        <Route path="/" render={props => <TitleBar {...props} />} />
                    </div>
                    <div className="container-fluid content">
                        <Route path='/routes' render={props => <RouteList />} />
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
            </MuiThemeProvider>
        </Router>
    );
};
