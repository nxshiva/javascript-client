import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import {
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import {
  AddDialog, TraineeTable, DeleteDialog, EditDialog,
} from './Components/index';
import trainees from './Data/trainee';


const useStyles = (theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  buttonPosition: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
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

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openEdit: false,
      openDelete: false,
      data: '',
      name: '',
      email: '',
      password: '',
      order: 'asc',
      orderBy: '',
      page: 0,
      rowsPerPage: 100,
    };
  }

  date = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  handleSort = (event, property) => {
    const { order, orderBy } = this.state;
    console.log('Propertyyyyyyyyyyy', property);
    const isAsc = orderBy === property && order === 'asc';
    if (isAsc) {
      this.setState({ order: 'desc', orderBy: property });
    } else {
      this.setState({ order: 'asc', orderBy: property });
    }
  };

  handleSelect = (event, trainee) => {
    console.log('Selected Trainee ', trainee);
  };

  onEditClose = () => {
    const { openEdit } = this.state;
    this.setState({ openEdit: false });
    return openEdit;
  }

  onEditSubmit = (data) => {
    const { openEdit } = this.state;
    this.setState({ openEdit: false }, () => {
      console.log('Edited Trainee', data);
    });
    return openEdit;
  }

  handleEditDialogOpen = (trainee) => {
    let { openEdit, data } = this.state;
    openEdit = true;
    data = trainee;
    this.setState({ openEdit, data });
  }

  onDeleteClose = () => {
    let { openDelete } = this.state;
    openDelete = false;
    this.setState({ openDelete });
  };

  onDeleteSubmit = (data) => {
    const { openDelete } = this.state;
    this.setState({ openDelete: false }, () => {
      console.log('Deleted Trainee', data);
    });
    return openDelete;
  }

  handleDeleteDialogOpen = (trainee) => {
    let { openDelete, data } = this.state;
    openDelete = true;
    data = trainee;
    this.setState({ openDelete, data });
  }

  onOpen = () => {
    let { open } = this.state;
    open = true;
    this.setState({ open });
  };

  onClose = () => {
    let { open } = this.state;
    open = false;
    this.setState({ open });
  };

  onSubmit = (data) => {
    const { open } = this.state;
    this.setState({ open: false }, () => {
      console.log(data);
    });
    return open;
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  render() {
    const {
      open, order, orderBy, openEdit, data, openDelete, page, rowsPerPage,
    } = this.state;
    const { match: { url } } = this.props;
    console.log('heloooooozzzzzzzz', data);
    const { classes } = this.props;
    console.log(this.state);
    return (
      <div className={classes.paper}>
        <div className={classes.buttonPosition}>
          <Button variant="outlined" color="primary" onClick={this.onOpen} className={classes.button}>
            ADD TRAINEEList
          </Button>
        </div>
        <AddDialog open={open} onClose={this.onClose} onSubmit={() => this.onSubmit} />
        <EditDialog
          open={openEdit}
          trainee={data}
          onClose={() => this.onEditClose}
          onSubmit={() => this.onEditSubmit}
        />
        <DeleteDialog
          open={openDelete}
          trainee={data}
          onClose={this.onDeleteClose}
          onSubmit={() => this.onDeleteSubmit}
        />
        <TraineeTable
          id="id"
          data={trainees}
          columns={
            [
              {
                field: 'name',
                label: 'Name',
                align: 'center',
              },
              {
                field: 'email',
                label: 'Email Address',
                align: 'center',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                label: 'Date',
                align: 'center',
                format: this.date,
              },
            ]
          }
          actions={
            [
              {
                icon: <EditIcon />,
                handler: this.handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: this.handleDeleteDialogOpen,
              },
            ]
          }
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <ul>
          {
            trainees && trainees.length && trainees.map((trainee) => (
              <Fragment key={trainee.id}>
                <li>
                  <Link to={`${url}/${trainee.id}`}>{trainee.name}</Link>
                </li>
              </Fragment>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default withStyles(useStyles)(Trainee);

Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};
