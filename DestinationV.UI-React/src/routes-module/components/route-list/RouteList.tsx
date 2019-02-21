import './RouteList.scss';
import { RouteDto } from '../../dto/route.dto';
import * as React from 'react';
import { connect } from 'react-redux';
import { loadRoutes, deleteRoute } from '../../store/action/route.action';
import { RouteItem } from './RouteItem';
import { PlaceDto } from '../../dto/place.dto';
import { ajax } from 'rxjs/ajax';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Observable, } from 'rxjs';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles, createStyles, WithStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = (theme: any) => createStyles({
    // Look at here: applied specific styles to resizing and background
    'typeWhite': {
        'color': 'white'
    }
});

// const test = { [className in keyof typeof styles]: string };
// type ClassNames = { classes: test };
  
export interface  ComponentProps  extends WithStyles<typeof styles>{
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
            map(result => result as PlaceDto[])
        );
    }

    getPlaces(): Observable<PlaceDto[]> {
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

    render() {
        if (this.props.routes) {
            return (
                <div>
                    <ExpansionPanel
                        square
                    // expanded={expanded === 'panel1'}
                    // onChange={this.handleChange('panel1')}
                    >
                        <ExpansionPanelSummary>
                            <Typography className={this.props.classes.typeWhite}>
                        DestinationV
                        </Typography>
                        </ExpansionPanelSummary>
                    </ExpansionPanel>
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
)(withStyles(styles)(RouteList))
