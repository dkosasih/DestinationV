import * as React from 'react';
import { RouteDto } from '../../dto/route.dto';
import { Modal } from 'react-bootstrap';

interface RouteItemProps {
    route: RouteDto;
    onDelete?: (routeid: string) => void;
}

export class RouteItem extends React.PureComponent<RouteItemProps, {modalShow: boolean, [key:string]: string | boolean }> {
    route = this.props.route;

    constructor(props: any) {
        super(props);
        this.state = {
            modalShow: false
        }
    }

    setModalState(value: boolean) {
        this.setState({
            modalShow: value
        });
    }

    handleDelete(routeId: string) {
        if (this.props.onDelete) {
            this.props.onDelete(routeId);
        }
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }

    render() {
        return (
                <div className="col-md-12">
                    <div className="col-md-3">
                        From: <strong>{this.route.origin.name}</strong>
                    </div>
                    <div className="col-md-3">
                        To: <strong>{this.route.destination.name}</strong>
                    </div>
                    <div className="col-md-4">Departing time: {this.route.departUtc}</div>
                    <div className="col-md-2">
                        <a href="#" onClick={() => this.setModalState(true)}>
                            edit
                    </a>
                    </div>
                    <Modal show={this.state.modalShow } onHide={() => this.setModalState(false)} backdrop={'static'}>
                        <Modal.Body>
                        <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-4">From</div>
                                    <div className="col-md-8">
                                        <input type="text" name="origin" value={this.route.origin.name} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                <div className="row">&nbsp;</div>
                                <div className="row">
                                    <div className="col-md-4">To</div>
                                    <div className="col-md-8">
                                    <input type="text" name="destination" value={this.route.destination.name} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                <div className="row">&nbsp;</div>
                                <div className="row">
                                    <div className="col-md-4">Departure</div>
                                    <div className="col-md-8">
                                        <input type="text" name="depart" value={this.route.departUtc.toString()} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(this.route.id)}>Delete</button>
                            <button className="btn btn-primary btn-sm" onClick={() => this.setModalState(false)}>Cancel</button>
                            <button className="btn btn-success btn-sm" onClick={() => this.setModalState(false)}>Save</button>
                        </Modal.Footer>
                    </Modal>
                </div>
        );
    }
}
