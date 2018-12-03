import './route-list.component.scss';
import { RouteDto } from '../dto/route.dto';
import * as React from 'react';
import { connect } from 'react-redux';
import { LoadRoutes } from '../store/action/route.action';

export interface  ComponentProps extends StateProps, DispatchProps {
    // products: RouteDto[];
    // deleteProduct?: (id: string, authToken: string) => void;
}

interface StateProps {
    routes: RouteDto[];
}

interface DispatchProps {
    loadRoutes: Function;
}

export class RouteList extends React.Component<ComponentProps, {}> {
    constructor(props: ComponentProps) {
        super(props);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.props.loadRoutes();
    }

    // delProd(id: string) {
    //     this.props.deleteProduct!(id, this.props.auth!.getAccessToken());
    // }

    renderChildren = ()=> this.props.routes.map((x,i) => {
            return i % 2 === 0 ? this.props.routes!.slice(i, i+2) : null;
        }).filter(x => x != null);

    getProductItem = (item: RouteDto) => {
        return (<div className="col-md-4 outline" key={item.id}>
            <div>{item.id}</div>
            {/* <Product product={item}
                authDelete={this.props.auth!.isAuthenticated() && this.props.auth!.userHasScopes([AuthPermission.writeProduct])}
                deleteItem={(id)=> this.delProd(id)} /> */}
        </div>)
    }

    render() {
        if (this.props.routes) {
            return (
                <div className="col-md-12">
                    {this.renderChildren().map((result, index) => {
                        return result
                            ? ([<div className="row" key={'row'+index}>
                                <div className="col-md-1" />
                                {result.map((item: RouteDto, i: number) => i === 0
                                    ? [this.getProductItem(item), <div key={'space'+i} className="col-md-2" />]
                                    : this.getProductItem(item))
                                }
                                <div className="col-md-1" />
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
    loadRoutes: () => dispatch((new LoadRoutes()).action())
    ,
    // deleteProduct: (id: string, authToken: string) => dispatch(productActions.deleteProductAction(id, authToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteList)
