import React from 'react';
import { PureComponent } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import DvButton from './common/components/Button';
import './TitleBar.scss';

class TitleBar extends PureComponent<any> {
    goTo(route: string) {
        this.props.history.push(`/${route}`);
    }

    render() {
        return (            
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className="logo right-menu" onClick={() => this.goTo('')}>
                        DestinationV
                        </Typography>
                    <DvButton onClick={() => this.goTo('routes')}>Route</DvButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default TitleBar;
