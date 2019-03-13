
import React from 'react';
import Button from '@material-ui/core/Button';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';

const styles = (theme: any) => createStyles({
    noDecoration: {
        textTransform: 'none',
    }
});

interface ComponentProps extends WithStyles<typeof styles> {
    onClick?: Function;
}

class DvButton extends React.PureComponent<ComponentProps> {
    constructor(props: ComponentProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick();
        }
    }

    render() {
        return (
            <Button color="inherit" className={this.props.classes.noDecoration} onClick={this.handleClick}>{this.props.children}</Button>
        );
    }
}

export default withStyles(styles)(DvButton);