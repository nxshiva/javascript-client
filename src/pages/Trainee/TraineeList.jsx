import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import {
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';
import * as moment from 'moment';
import { graphql } from '@apollo/react-hoc';
import {
  AddDialog, TraineeTable, DeleteDialog, EditDialog,
} from './Components/index';
import trainees from './Data/trainee';
import { MyContext } from '../../contexts';
import { GET_TRAINEE } from './query';
import { CREATE_TRAINEE, EDIT_TRAINEE, DELETE_TRAINEE } from './mutation';
import { UPDATED_TRAINEE_SUB, DELETED_TRAINEE_SUB } from './subscription';

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
      data: {},
      order: 'asc',
      orderBy: '',
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() {
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: UPDATED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        const { getAllTrainee: { records } } = prev;
        const { data: { traineeUpdated } } = subscriptionData;
        const updatedRecords = [...records].map((record) => {
          if (record.originalId === traineeUpdated.originalId) {
            return {
              ...record,
              ...traineeUpdated,
            };
          }
          return record;
        });
        return {
          getAllTrainee: {
            ...prev.getAllTrainee,
            count: prev.getAllTrainee.count,
            records: updatedRecords,
          },
        };
      },
    });

    subscribeToMore({
      document: DELETED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        const { getAllTrainee: { records } } = prev;
        const { data: { traineeDeleted } } = subscriptionData;
        // eslint-disable-next-line max-len
        const updatedRecords = [...records].filter((record) => record.originalId !== traineeDeleted);
        return {
          getAllTrainee: {
            ...prev.getAllTrainee,
            count: prev.getAllTrainee.count - 1,
            records: updatedRecords,
          },
        };
      },
    });
  }

  date = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  handleSort = (event, property) => {
    const { order, orderBy } = this.state;
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

  handleEditDialogOpen = (trainee) => {
    let { openEdit, data } = this.state;
    openEdit = true;
    data = trainee;
    this.setState({ openEdit, data });
  }

  handleDeleteDialogOpen = (trainee) => {
    let { openDelete, data } = this.state;
    openDelete = true;
    data = trainee;
    this.setState({ openDelete, data });
  }

  handleChangePage = (refetch) => (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({ page: newPage }, () => {
      refetch({ limit: rowsPerPage, skip: rowsPerPage * newPage });
    });
  }

  handleChangeRowsPerPage = (refetch) => (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    }, () => {
      const { page, rowsPerPage } = this.state;
      refetch({ limit: rowsPerPage, skip: rowsPerPage * page });
    });
  };

  onOpen = () => {
    let { open } = this.state;
    open = true;
    this.setState({ open });
  };

  onClose = (state) => {
    this.setState({ [state]: false });
    return true;
  }

  onCreateSubmit = (openSnackbar, createTrainee) => async (data) => {
    try {
      console.log('Create Data', data);
      const response = await createTrainee({ variables: data });
      console.log('Response', response);
      this.setState({ open: false }, () => {
        openSnackbar('Trainee Added Successfully', 'success');
      });
    } catch (error) {
      openSnackbar(error.message, 'error');
    }
  }

  onEditSubmit = (openSnackbar, updateTrainee) => (data) => {
    console.log('Edit Data', data);
    updateTrainee({ variables: data }).then((response) => {
      console.log('Response', response);
      this.setState({ openEdit: false, data: {} }, () => {
        openSnackbar('Trainee Updated Successfully', 'success');
      });
    }).catch((error) => {
      openSnackbar(error.message, 'error');
    });
  }

  onDeleteSubmit = (openSnackbar, deleteTrainee) => (data) => {
    const { rowsPerPage, page } = this.state;
    const {
      data: {
        getAllTrainee: { count = 0 } = {},
        refetch,
      },
    } = this.props;
    const result = count - (page * rowsPerPage);
    console.log('Delete Data', data);
    deleteTrainee({ variables: data }).then((response) => {
      console.log('Response', response);
      if (result === 1 && page > 0) {
        this.setState({ openDelete: false, data: {}, page: page - 1 }, () => {
          refetch({ limit: rowsPerPage, skip: rowsPerPage * (page - 1) });
          openSnackbar('Trainee Deleted Successfully', 'success');
        });
      } else {
        this.setState({ openDelete: false, data: {} }, () => {
          refetch({ limit: rowsPerPage, skip: rowsPerPage * page });
          openSnackbar('Trainee Deleted Successfully', 'success');
        });
      }
    }).catch((error) => {
      openSnackbar(error.message, 'error');
    });
  }

  render() {
    const {
      open, order, orderBy, openEdit, data, openDelete, page,
      rowsPerPage,
    } = this.state;
    console.log('Render called');
    const { match: { url } } = this.props;
    const {
      classes,
      data: {
        getAllTrainee: { count = 0, records = [] } = {},
        refetch,
        loading,
      },
    } = this.props;

    const variables = { limit: rowsPerPage, skip: rowsPerPage * page };
    const { openSnackBar } = this.context;
    return (
      <div className={classes.paper}>
        <div className={classes.buttonPosition}>
          <Button variant="outlined" color="primary" onClick={this.onOpen} className={classes.button}>
            ADD TRAINEEList
          </Button>
        </div>
        <Mutation mutation={CREATE_TRAINEE} refetchQueries={[{ query: GET_TRAINEE, variables }]}>
          {(createTrainee, loader = { loading }) => (
            <>
              <AddDialog
                open={open}
                onClose={() => this.onClose}
                onSubmit={this.onCreateSubmit(openSnackBar, createTrainee)}
                loader={loader}
              />
            </>
          )}
        </Mutation>
        <Mutation mutation={EDIT_TRAINEE}>
          {(updateTrainee, loader = { loading }) => (
            <>
              <EditDialog
                open={openEdit}
                trainee={data}
                onClose={() => this.onClose}
                onSubmit={this.onEditSubmit(openSnackBar, updateTrainee)}
                loader={loader}
              />
            </>
          )}
        </Mutation>
        <Mutation mutation={DELETE_TRAINEE}>
          {(deleteTrainee, loader = { loading }) => (
            <>
              <DeleteDialog
                open={openDelete}
                trainee={data}
                onClose={() => this.onClose}
                onSubmit={this.onDeleteSubmit(openSnackBar, deleteTrainee)}
                loader={loader}
              />
            </>
          )}
        </Mutation>
        <TraineeTable
          id="_id"
          data={records}
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
                key: 1,
              },
              {
                icon: <DeleteIcon />,
                handler: this.handleDeleteDialogOpen,
                key: 2,
              },
            ]
          }
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage(refetch)}
          onChangeRowsPerPage={this.handleChangeRowsPerPage(refetch)}
          loading={loading}
          dataLength={records.length}
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

export default compose(
  withStyles(useStyles),
  graphql(GET_TRAINEE, {
    options: { variables: { limit: 10, skip: 0 } },
  }),
)(Trainee);
Trainee.contextType = MyContext;

Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};
