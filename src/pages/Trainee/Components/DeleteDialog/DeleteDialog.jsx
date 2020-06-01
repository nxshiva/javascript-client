import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function DeleteDialog(props) {
  const {
    open, onClose, onSubmit, trainee,
  } = props;
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSubmit()(
            trainee,
          )}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  trainee: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default DeleteDialog;
