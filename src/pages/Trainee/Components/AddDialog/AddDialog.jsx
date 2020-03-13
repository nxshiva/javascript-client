import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  dialog: {
    display: 'flex',
    flexDirection: 'column',
  },
  margin: {
    margin: 8,
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: 540,
  },
  flexyOne: {
    flexGrow: 1,
  },
  password: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export default function AddDialog(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const { open, onClose, onSubmit } = props;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add TRAINEE</DialogTitle>
      <DialogContent className={classes.dialog}>
        <DialogContentText>
          Add your trainee details
        </DialogContentText>
        <TextField
          label="With normal TextField"
          id="outlined-start-adornment"
          helperText="Some important"
          className={clsx(classes.margin)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
          }}
          variant="outlined"
        />
        <TextField
          label="With normal TextField"
          id="outlined-start-adornment"
          helperText="Some important"
          className={clsx(classes.margin)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
          }}
          variant="outlined"
        />
        <div className={classes.password}>
          <FormControl className={clsx(classes.margin)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              helperText="Some important"
              onChange={handleChange('password')}
              startAdornment={(
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={clsx(classes.margin)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              startAdornment={(
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
              labelWidth={70}
            />
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>

  );
}


AddDialog.propTypes = {
  //  value: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
