import React from 'react';

import { PureComponent } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import './title-bar.scss';

class TitleBar extends PureComponent<any> {
    goTo(route: string) {
        this.props.history.push(`/${route}`);
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a className="logo" onClick={() => this.goTo('')}>
                            DestinationV
                        </a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} onClick={() => this.goTo('routes')}>All Schedule</NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default TitleBar;
