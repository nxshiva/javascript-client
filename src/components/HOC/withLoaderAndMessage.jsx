import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  buttonPosition: {
    display: 'flex',
  },
  Text: {
    color: 'grey',
  },
}));

const withLoaderAndMessage = (WrappedComponent) => (props) => {
  const classes = useStyles();
  const { loading, ...rest } = props;
  if (loading) {
    return (<div className={classes.buttonPosition} style={{ justifyContent: 'center' }}><CircularProgress color="secondary" /></div>);
  }

  return (
    <WrappedComponent {...rest} />
  );
};

export default withLoaderAndMessage;
