import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import propTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
// import * as moment from 'moment';
import callApi from '../../../../lib/utils/api';


import { MyContext } from '../../../../contexts';

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  fetchData = (value) => {
    const { onSubmit, trainee } = this.props;
    const url = `trainee/${trainee.originalId}`;
    this.setState({ loading: true }, async () => {
      const response = await callApi('delete', url, {});
      this.setState({ loading: false }, () => {
        if (response.status === 'ok') {
          onSubmit()(trainee);
          value.openSnackBar(response.message, 'success');
        } else {
          value.openSnackBar(response.message, response.status);
        }
      });
    });
  }

  // handleSnackBarMessage = (data, openSnackBar) => {
  //   const date = '2019-02-14T18:15:11.778Z';
  //   const isAfter = (moment(data.createdAt).isAfter(date));
  //   if (isAfter) {
  //     this.setState({
  //       message: 'This is a success Message! ',
  //     }, () => {
  //       const { message } = this.state;
  //       openSnackBar(message, 'success');
  //     });
  //   } else {
  //     this.setState({
  //       message: 'This is an error',
  //     }, () => {
  //       const { message } = this.state;
  //       openSnackBar(message, 'error');
  //     });
  //   }
  // }

  render = () => {
    const {
      onClose, open,
    } = this.props;
    const { loading } = this.state;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to remove trainee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onClose()('openDelete')}
            color="primary"
          >
            Cancel
          </Button>
          <MyContext.Consumer>
            {(value) => (
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={() => {
                  this.fetchData(value);
                }}
              >
                {loading && (
                  <CircularProgress color="secondary" />
                )}
                {loading && <span> Deleting....</span>}
                {!loading && <span>Delete</span>}
              </Button>
            )}
          </MyContext.Consumer>

        </DialogActions>
      </Dialog>
    );
  }
}
DeleteDialog.propTypes = {
  onClose: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
  onSubmit: propTypes.func.isRequired,
  trainee: propTypes.objectOf(propTypes.string).isRequired,
};
export default DeleteDialog;
