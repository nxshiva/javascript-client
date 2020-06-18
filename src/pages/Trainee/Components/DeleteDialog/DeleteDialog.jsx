import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

function DeleteDialog(props) {
  const {
    onClose, open, onSubmit, trainee, loader: { loading },
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
        <Button
          onClick={() => onClose()('openDelete')}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={() => {
            onSubmit({ id: trainee.originalId });
          }}
        >
          {loading && (
            <CircularProgress color="secondary" />
          )}
          {loading && <span> Deleting....</span>}
          {!loading && <span>Delete</span>}
        </Button>

      </DialogActions>
    </Dialog>
  );
}
DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  trainee: PropTypes.objectOf(PropTypes.string).isRequired,
  loader: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default DeleteDialog;
