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
import PropTypes from 'prop-types';
import EmailIcon from '@material-ui/icons/Email';
// import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/,
    'Must contain 8 characters at least one uppercase one lowercase and one number'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      hasError: false,
      error: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  hasErrors = () => {
    const { hasError } = this.state;
    schema
      .isValid(this.state)
      .then((valid) => {
        console.log('hasError', hasError);
        if (!valid !== hasError) {
          this.setState({ hasError: !valid });
        }
      });
  }

  isTouched = (field) => {
    const { touched } = this.state;
    console.log('field', field);
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  getError = (field) => {
    const { error, touched } = this.state;
    if (touched[field]) {
      console.log('check3');
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
    const { open, onClose, onSubmit } = this.props;
    const {
      name, email, password, confirmPassword, hasError, error,
    } = this.state;
    console.log(this.state);
    this.hasErrors();
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add TRAINEE</DialogTitle>
        <DialogContent className={classes.useStyles}>
          <DialogContentText>
            Add your trainee details
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name *"
                id="outlined-start-adornment"
                value={name}
                error={!!error.name}
                fullWidth
                onChange={this.handleChange('name')}
                helperText={this.getError('name')}
                onBlur={() => this.isTouched('name')}
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
                value={email}
                error={!!error.email}
                fullWidth
                onChange={this.handleChange('email')}
                helperText={this.getError('email')}
                onBlur={() => this.isTouched('email')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                id="outlined-start-adornment"
                type="password"
                value={password}
                error={!!error.password}
                fullWidth
                onChange={this.handleChange('password')}
                helperText={this.getError('password')}
                onBlur={() => this.isTouched('password')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><VisibilityOff /></InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Confirm Password"
                id="outlined-start-adornment"
                type="password"
                error={!!error.confirmPassword}
                fullWidth
                value={confirmPassword}
                onChange={this.handleChange('confirmPassword')}
                helperText={this.getError('confirmPassword')}
                onBlur={() => this.isTouched('confirmPassword')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><VisibilityOff /></InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit()({
              name, email, password, confirmPassword,
            })}
            disabled={hasError}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(useStyles)(AddDialog);

AddDialog.propTypes = {
  //  value: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
