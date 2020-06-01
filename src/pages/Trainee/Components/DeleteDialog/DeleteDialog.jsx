import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import propTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import * as moment from 'moment';

import { MyContext } from '../../../../contexts';

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleSnackBarMessage = (data, openSnackBar) => {
    const date = '2019-02-14T18:15:11.778Z';
    const isAfter = (moment(data.createdAt).isAfter(date));
    if (isAfter) {
      this.setState({
        message: 'This is a success Message! ',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'This is an error',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  render = () => {
    const {
      onClose, open, onSubmit, trainee,
    } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to remove trainee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <MyContext.Consumer>
            {(value) => {
              const { openSnackBar } = value;
              return (
                <>
                  <Button color="primary" variant="contained" onClick={() => { onSubmit()('openDelete', trainee); this.handleSnackBarMessage(trainee, openSnackBar); }}>
                    Delete
                  </Button>
                </>
              );
            }}
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
