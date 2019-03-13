import './RouteList.scss';
import { RouteDto } from '../../dto/route.dto';
import * as React from 'react';
import { connect } from 'react-redux';
import { loadRoutes, deleteRoute } from '../../store/action/route.action';
import { RouteItem } from './RouteItem';
import { PlaceDto } from '../../dto/place.dto';
import { ajax } from 'rxjs/ajax';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { Fab, Typography, Icon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme: any) =>
    createStyles({
        typeWhite: {
            color: 'white'
        }
    });

// const test = { [className in keyof typeof styles]: string };
// type ClassNames = { classes: test };

export interface ComponentProps extends WithStyles<typeof styles> {
    routes: RouteDto[];
    loadRoutes: Function;
    deleteProduct: (id: string) => void;
}

export class RouteList extends React.Component<ComponentProps, {currentPanelId:string}> {
    placeDto$: Observable<PlaceDto[]>;

    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            currentPanelId: ''
        };
        this.delProd = this.delProd.bind(this);
    }
   
    componentDidMount() {
        this.getData();
    }

    getData() {
        this.props.loadRoutes();
    }

    private requestPlaces(): Observable<PlaceDto[]> {
        // TODO: refactor this to either use redux or at least constants for the URL
        return ajax
            .getJSON('http://localhost:5000/api/place')
            .pipe(map(result => result as PlaceDto[]));
    }

    getPlaces(): Observable<PlaceDto[]> {
        // cache strategy to avoid multiple server call when loading ref objects
        if (!this.placeDto$) {
            this.placeDto$ = this.requestPlaces().pipe(
                publishReplay(1),
                refCount()
            );
        }
        return this.placeDto$;
    }

    delProd(id: string) {
        this.props.deleteProduct(id);
    }

    handleStateChange = (panelId: string) => () => this.setState({ currentPanelId: panelId });

    render() {
        if (this.props.routes) {
            return (
                <div className="container-fluid">
                    {this.props.routes.map((result, index) => {
                        return result ? (
                            <ExpansionPanel expanded={this.state.currentPanelId === result.id}
                                key={'eps' + index}
                                square
                                // expanded={expanded === 'panel1'}
                                // onChange={this.handleChange('panel1')}
                            >
                                <ExpansionPanelSummary >
                                    <div
                                        className={
                                            'col-md-3 align-self-center ' +
                                            this.props.classes.typeWhite
                                        }
                                        data-testid="routeOrigin"
                                    >
                                        Origin: <strong>{result.origin.name}</strong>
                                    </div>
                                    <div
                                        className="col-md-3 align-self-center"
                                        data-testid="routeDestination"
                                    >
                                        Destination: <strong>{result.destination.name}</strong>
                                    </div>
                                    <div
                                        className="col-md-4 align-self-center"
                                        data-testid="routeDate"
                                    >
                                        Departing time: {result.departUtc}
                                    </div>
                                    <div className="col-md-2 align-self-center">
                                        <Fab color="primary" data-testid="buttonEdit" onClick={this.handleStateChange(result.id)}>
                                            <EditIcon/>
                                        </Fab>
                                    </div>
                                </ExpansionPanelSummary>
                            </ExpansionPanel>
                        ) : null;
                    })}
                </div>
                // <div className="col-md-12">
                //     {this.props.routes.map((result, index) => {
                //         return result
                //             ? ([<div className="row" key={'row' + index}>
                //                 <RouteItem key={`elem${index}`} route={result} onDelete={this.delProd} places={this.getPlaces()} />
                //             </div>,
                //             <div key={'emp-row' + index} className="row">&nbsp;</div>])
                //             : null;
                //     })}
                // </div>
            );
        } else {
            return null;
        }
    }
}

interface OwnProps {}

const mapStateToProps = (state: any) => ({
    routes: state.routes
});

const mapDispatchToProps = (dispatch: Function, props: OwnProps) => ({
    loadRoutes: () => dispatch(loadRoutes()),
    deleteProduct: (id: string) => dispatch(deleteRoute(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(RouteList));
