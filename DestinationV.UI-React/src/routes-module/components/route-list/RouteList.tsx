import './RouteList.scss';
import { RouteDto } from '../../dto/route.dto';
import * as React from 'react';
import { connect } from 'react-redux';
import { loadRoutes, deleteRoute } from '../../store/action/route.action';
import { RouteItem } from './RouteItem';
import { PlaceDto } from '../../dto/place.dto';
import { ajax } from 'rxjs/ajax';
import { map, publishReplay, refCount, switchMap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';

export interface  ComponentProps {
    routes: RouteDto[];
    loadRoutes: Function;
    deleteProduct: (id: string) => void;
}

export class RouteList extends React.Component<ComponentProps, {}> {
    placeDto$: Observable<PlaceDto[]>;

    constructor(props: ComponentProps) {
        super(props);

        this.delProd = this.delProd.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.props.loadRoutes();
    }

    private requestPlaces(): Observable<PlaceDto[]> {
        return ajax.getJSON('http://localhost:5000/api/place').pipe(
            map(result => {
                console.log(result);
                return result as PlaceDto[];
            })
        );
    }

    getPlaces(): Observable<PlaceDto[]> {
        const timer$ = timer(0, 10000);
        
        if (!this.placeDto$) {
            this.placeDto$ = timer$.pipe(
                switchMap(() => this.requestPlaces()),
                publishReplay(1),
                refCount()
            );
        }
        return this.placeDto$;
    }

    delProd(id: string) {
        this.props.deleteProduct(id);
    }

    render() {
        if (this.props.routes) {
            return (
                <div className="col-md-12">
                    {this.props.routes.map((result, index) => {
                        return result
                            ? ([<div className="row" key={'row' + index}>
                                <RouteItem key={`elem${index}`} route={result} onDelete={this.delProd} places={this.getPlaces()} />
                            </div>,
                            <div key={'emp-row' + index} className="row">&nbsp;</div>])
                            : null;
                    })}
                </div>
            );
        } else {
            return null;
        }
    }
}

interface OwnProps {
}

const mapStateToProps = (state: any) => ({
    routes: state.routes
});

const mapDispatchToProps = (dispatch: Function, props: OwnProps) => ({
    loadRoutes: () => dispatch(loadRoutes()),
    deleteProduct: (id: string) => dispatch(deleteRoute(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteList)
