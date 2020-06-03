import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import PropTypes from 'prop-types';
// import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import callApi from '../../lib/utils/api';

import { MyContext } from '../../contexts/index';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const useStyles = (theme) => ({
  box: {
    marginTop: theme.spacing(16),
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      fetchData: '',
      hasError: false,
      error: {
        email: '',
        password: '',
      },
      touched: {
        email: false,
        password: false,
      },
    };
  }

  fetchData = (value) => {
    const { email, password } = this.state;

    this.setState({ loading: true }, async () => {
      const response = await callApi('post', 'user/login', {
        email,
        password,
      });
      this.setState({ loading: false }, () => {
        if (response.status === 'ok') {
          localStorage.setItem('Token', response.data);
          const { history } = this.props;
          history.push('/trainee');
        } else {
          value.openSnackBar(response.message, response.status);
        }
      });
    });
  }

  handleChange = (prop) => (event) => {
    this.setState({
      [prop]: event.target.value,
    }, () => {
      this.getError(prop);
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

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    }, () => {
      this.getError(field);
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
      email, password, error, loading,
    } = this.state;
    // console.log(this.state);
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box mx="auto" bgcolor="background.paper" p={2} className={classes.box} boxShadow={3}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Log in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                label="Email Address"
                id="outlined-start-adornment"
                margin="normal"
                value={email}
                error={!!error.email}
                fullWidth
                onChange={this.handleChange('email')}
                helperText={error.email}
                onBlur={() => this.isTouched('email')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
                variant="outlined"
              />
              <TextField
                label="Password"
                id="outlined-start-adornment"
                margin="normal"
                type="password"
                value={password}
                error={!!error.password}
                fullWidth
                onChange={this.handleChange('password')}
                helperText={error.password}
                onBlur={() => this.isTouched('password')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><VisibilityOff /></InputAdornment>,
                }}
                variant="outlined"
              />
              <MyContext.Consumer>
                {(value) => (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading || this.hasErrors()}
                    onClick={() => { this.fetchData(value); }}
                  >
                    {loading && (
                      <CircularProgress color="secondary" />
                    )}
                    {loading && <span> Signing in...</span>}
                    {!loading && <span>Sign in</span>}
                  </Button>
                )}
              </MyContext.Consumer>
            </form>
          </div>
        </Box>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Login);

Login.propTypes = {
  classes: PropTypes.element.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
