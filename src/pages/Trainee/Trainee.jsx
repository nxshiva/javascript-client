import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddDialog from './Components/index';

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
    console.log(this.state);
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.onOpen}>
          ADD TRAINEE
        </Button>
        <AddDialog open={open} onClose={this.onClose} onSubmit={() => this.onSubmit} />
      </div>
    );
  }
}

export default Trainee;
