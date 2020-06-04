import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import callApi from '../../../../lib/utils/api';

import { MyContext } from '../../../../contexts';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3),
  email: yup.string().email().required('Email is required'),
});

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loading: false,
      error: {
        name: '',
        email: '',
      },
      touched: {
        name: false,
        email: false,
      },
    };
    this.baseState = this.state;
  }

  fetchData = (value) => {
    const {
      name, email,
    } = this.state;
    const { onSubmit, trainee } = this.props;
    this.setState({ loading: true }, async () => {
      const response = await callApi('put', 'trainee', {
        name,
        email,
        // password: 'Training@123',
        id: trainee.originalId,
      });
      this.setState({ loading: false }, () => {
        if (response.status === 'ok') {
          onSubmit()('openEdit', {
            name, email,
          });
          this.resetForm();
          value.openSnackBar(response.message, 'success');
        } else {
          value.openSnackBar(response.message, response.status);
        }
      });
    });
  }

  resetForm = () => {
    if (JSON.stringify(this.state) !== JSON.stringify(this.baseState)) {
      this.setState(this.baseState);
    }
  }

  handleChange = (prop) => (event) => {
    const { touched } = this.state;
    this.setState({
      [prop]: event.target.value,
      touched: {
        ...touched,
        [prop]: true,
      },
    }, () => {
      this.isTouched(['name', 'email']);
    });
  };

  hasErrors = () => {
    const { error, touched } = this.state;
    let touchAll = Object.values(touched);
    let isError = Object.values(error);
    touchAll = touchAll.every((value) => value);
    isError = isError.every((value) => value === '');
    if (isError && touchAll) {
      return false;
    }

    return true;
  }

  isTouched = (states) => {
    const { touched } = this.state;
    const { trainee } = this.props;
    states.forEach((state) => {
      if (touched[state] === false) {
        this.setState({
          [state]: trainee[state],
          touched: {
            [state]: true,
          },
        });
      }
    });
  }

  getError = (field) => {
    const { error, touched } = this.state;
    if (touched[field]) {
      schema.validateAt(field, this.state).then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      }).catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    }
    return error[field];
  }

  render() {
    const { classes } = this.props;
    const {
      open, onClose, trainee,
    } = this.props;
    const {
      error, loading,
    } = this.state;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit TRAINEE</DialogTitle>
        <DialogContent className={classes.useStyles}>
          <DialogContentText>
            Enter your trainee details
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name *"
                id="outlined-start-adornment"
                defaultValue={trainee.name}
                error={!!error.name}
                fullWidth
                onChange={this.handleChange('name')}
                helperText={this.getError('name')}
                onBlur={() => this.isTouched(['name', 'email'])}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                id="outlined-start-adornment"
                defaultValue={trainee.email}
                error={!!error.email}
                fullWidth
                onChange={this.handleChange('email')}
                helperText={this.getError('email')}
                onBlur={() => this.isTouched(['name', 'email'])}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onClose()('openEdit') && this.resetForm()}
            color="primary"
          >
            Cancel
          </Button>
          <MyContext.Consumer>
            {(value) => (
              <Button
                variant="contained"
                color="primary"
                disabled={loading || this.hasErrors()}
                onClick={() => {
                  this.fetchData(value);
                }}
              >
                {loading && (
                  <CircularProgress color="secondary" />
                )}
                {loading && <span> Adding....</span>}
                {!loading && <span>Submit</span>}
              </Button>
            )}
          </MyContext.Consumer>

        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(useStyles)(EditDialog);

EditDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  trainee: PropTypes.objectOf(PropTypes.any).isRequired,
};
