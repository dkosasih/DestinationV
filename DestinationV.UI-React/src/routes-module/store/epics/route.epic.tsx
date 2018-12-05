import { RouteTypes, loadRoutesComplete, loadRoutesFailed, deleteRouteCompleted, deleteRouteFailed } from '../action/route.action';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { history } from '../../../app';

// TODO: move ajax call to service so that it's testable - Trello updated
const routesLoadEpic = (action$: ActionsObservable<any>) =>
    action$.pipe(
        filter(action => action.type === RouteTypes.LoadRoutes),
        switchMap(() => {
            return ajax.getJSON('http://localhost:5000/api/route').pipe(
                map(result => loadRoutesComplete(result)),
                catchError(err => {
                    // TODO: Log properly and send to error page
                    history.replace('/');
                    return of(loadRoutesFailed());
                })
            );
        })
    );

const deleteRoute = (action$: ActionsObservable<any>) =>
    action$.pipe(
        filter(action => action.type === RouteTypes.DeleteRoute),
        map(action => action.payload),
        switchMap((id) => {
            return ajax.delete(`http://localhost:5000/api/route/${id}`).pipe(
                map(result => deleteRouteCompleted(id)),
                catchError(err => {
                    // TODO: Log properly and send to error page
                    history.replace('/');
                    return of(deleteRouteFailed());
                })
            );
        })
    );

export default [routesLoadEpic, deleteRoute];
