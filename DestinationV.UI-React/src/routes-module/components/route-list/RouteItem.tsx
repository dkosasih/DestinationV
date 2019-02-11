import * as React from 'react';
import { RouteDto } from '../../dto/route.dto';
// import { Modal } from 'react-bootstrap';
import { PlaceDto } from '../../dto/place.dto';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
// import { Button } from '@material-ui/core';

interface RouteItemProps {
    route: RouteDto;
    places: Observable<PlaceDto[]>;
    onDelete?: (routeid: string) => void;
}

export class RouteItem extends React.PureComponent<RouteItemProps, {modalShow: boolean, [key:string]: string | boolean }> {
    private destroy$: Subject<void> = new Subject<void>();
    private route = this.props.route;
    // private places: PlaceDto[] = [];


    constructor(props: any) {
        super(props);
        this.state = {
            modalShow: false,
            origin: this.route.origin.id,
            destination: this.route.destination.id
        }

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.props.places.pipe(
            takeUntil(this.destroy$),
            // tap(x => { this.places = x })
        ).subscribe();
    }

    componentWillUnmount() {
        this.destroy$.next();
    }

    showModal() {
        this.setState({
            modalShow: true
        });
    }

    hideModal() {
        this.setState({
            modalShow: false
        });
    }

    handleDelete() {
        if (this.props.onDelete) {
            this.props.onDelete(this.route.id);
        }
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }

    render() {
        return (
            <div className="col-md-12">
                <div className="row"><div className="col-md-3">
                    From: <strong>{this.route.origin.name}</strong>
                </div>
                <div className="col-md-3">
                    To: <strong>{this.route.destination.name}</strong>
                </div>
                <div className="col-md-4">Departing time: {this.route.departUtc}</div>
                <div className="col-md-2">
                    <a href="#" onClick={this.showModal}>
                        edit
                    </a>
                </div>
                </div>
                {/* <Modal show={this.state.modalShow} onHide={this.hideModal} backdrop={'static'}>
                    <Modal.Body>
                        <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-4">From</div>
                                    <div className="col-md-8">
                                        <select value={this.state.origin as string} onChange={this.handleInputChange}>
                                            {this.places.map((place, i) => {
                                                return (<option value={place.id} key={`origin${i}`}>{place.name}</option>)
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">&nbsp;</div>
                                <div className="row">
                                    <div className="col-md-4">To</div>
                                    <div className="col-md-8">
                                        <select value={this.state.destination as string} onChange={this.handleInputChange}>
                                            {this.places.map((place, i) => {
                                                return (<option value={place.id} key={`destination${i}`}>{place.name}</option>)
                                            })}
                                        </select>
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
                        <Button variant="contained" color="primary" onClick={this.handleDelete}>Delete</Button>
                        <button className="btn btn-primary btn-sm" onClick={this.hideModal}>Cancel</button>
                        <button className="btn btn-success btn-sm" onClick={this.hideModal}>Save</button>
                    </Modal.Footer>
                </Modal> */}
            </div>
        );
    }
}
