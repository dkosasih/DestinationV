import 'bootstrap3/dist/css/bootstrap-theme.css';
import 'bootstrap3/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { doRoutes } from './app';
import * as serviceWorker from './serviceWorker';

const routes = doRoutes();
ReactDOM.render(
    <div>
        {routes}
    </div>,
    document.getElementById('root') as HTMLElement
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
