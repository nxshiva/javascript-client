import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddDialog from './Components/index';

const useStyles = (theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      email: '',
      password: '',
    };
  }

  onOpen = () => {
    let { open } = this.state;
    open = true;
    this.setState({ open });
  };

  onClose = () => {
    let { open } = this.state;
    open = false;
    this.setState({ open });
  };

  onSubmit = (data) => {
    const { open } = this.state;
    this.setState({ open: false }, () => {
      console.log(data);
    });
    return open;
  }

  render() {
    const { open } = this.state;
    const { classes } = this.props;
    console.log(this.state);
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.onOpen} className={classes.button}>
          ADD TRAINEE
        </Button>
        <AddDialog open={open} onClose={this.onClose} onSubmit={() => this.onSubmit} />
      </div>
    );
  }
}

export default withStyles(useStyles)(Trainee);
