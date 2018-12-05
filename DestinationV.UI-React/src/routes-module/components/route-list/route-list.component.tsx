import './route-list.component.scss';
import { RouteDto } from '../../dto/route.dto';
import * as React from 'react';
import { connect } from 'react-redux';
import { loadRoutes, deleteRoute } from '../../store/action/route.action';
import { RouteItem } from './route-item.component';

export interface  ComponentProps {
    routes: RouteDto[];
    loadRoutes: Function;
    deleteProduct: (id: string) => void;
}

export class RouteList extends React.Component<ComponentProps, {}> {
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

    delProd(id: string) {
        this.props.deleteProduct(id);
    }

    renderChildren = () => this.props.routes.map((x, i) => {
        return i % 2 === 0 ? this.props.routes!.slice(i, i + 2) : null;
    }).filter(x => x != null);

    render() {
        if (this.props.routes) {
            return (
                <div className="col-md-12">
                    {this.props.routes.map((result, index) => {
                        return result
                            ? ([<div className="row" key={'row' + index}>
                                <RouteItem key={`elem${index}`} route={result} onDelete={this.delProd} />
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
