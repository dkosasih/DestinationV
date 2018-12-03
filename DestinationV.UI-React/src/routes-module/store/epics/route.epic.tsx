import { RouteTypes, LoadRoutesComplete } from '../action/route.action';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
import { filter, switchMap } from 'rxjs/operators';
import { RouteDto } from '../../dto/route.dto';

// TODO: move ajax call to service so that it's testable - Trello updated
const routesLoadEpic = (action$: ActionsObservable<any>) =>
    action$.pipe(
        filter(action => action.type === RouteTypes.LoadRoutes),
        switchMap(() => {
             return of((new LoadRoutesComplete([{ id: 'abc' }, { id: 'def' }] as RouteDto[])).action());
            // return of(loadRoutesComplete([{ id: 'abc' }, { id: 'def' }] as RouteDto[]));
            // of([{ id: 'abc' }, { id: 'def' }])
        }
            // ajax
            //     .getJSON('http://localhost:58527/api/product', {
            //         Authorization: `Bearer ${loadAction!}`
            //     })
            //     .pipe(
            //         map((result: RouteDto[]) => new LoadRoutesComplete(result)),
            //         catchError(err => {
            //             // TODO: Log properly and send to error page
            //             console.log(err.xhr.response);
            //             // return of(push('/'));
            //         })
            //     )
        )
    );

export default [
    routesLoadEpic
];
