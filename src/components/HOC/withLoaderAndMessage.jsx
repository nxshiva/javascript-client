import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  createMuiTheme, ThemeProvider, Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  buttonPosition: {
    display: 'flex',
  },
  Text: {
    color: 'grey',
  },
}));

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'Arial',
    ].join(','),
  },
});

const withLoaderAndMessage = (WrappedComponent) => (props) => {
  const classes = useStyles();
  const { loading, ...rest } = props;
  if (loading) {
    return (<div className={classes.buttonPosition} style={{ justifyContent: 'center' }}><CircularProgress color="secondary" /></div>);
  }

  return (
    <>
      {props.dataLength ? (<WrappedComponent {...rest} />) : (
        <>
          <ThemeProvider theme={theme}>
            <Typography>
              <div className={classes.Text} align="center">
                <h4>
                  OOPS!, No More Trainees
                </h4>
              </div>
            </Typography>
          </ThemeProvider>
        </>
      )}
    </>

  );
};

export default withLoaderAndMessage;
