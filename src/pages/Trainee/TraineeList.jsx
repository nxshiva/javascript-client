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
// import CircularProgress from '@material-ui/core/CircularProgress';
import {
  AddDialog, TraineeTable, DeleteDialog, EditDialog,
} from './Components/index';
import trainees from './Data/trainee';
import callApi from '../../lib/utils/api';
import { MyContext } from '../../contexts';


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
      rowsPerPage: 20,
      count: 0,
      tableData: [],
      loading: false,
    };
  }

  componentDidMount(event) {
    this.handleChangePage(event, 0);
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

  test = async (response, page) => {
    if (response.length === 0 && page > 0) {
      await this.handleChangePage('', (page - 1));
    }
  }

  handleChangePage = (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({ page: newPage, loading: true }, async () => {
      const { page } = this.state;
      const response = await callApi('get', 'trainee', {
        limit: rowsPerPage,
        skip: page * rowsPerPage,
      });

      this.setState({ loading: false }, () => {
        if (response.status === 'ok') {
          this.setState({ count: response.data.count, tableData: response.data.records });
        } else {
          const value = this.context;
          value.openSnackBar(response.message, response.status);
        }
      });
    });
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    }, () => {
      const { page } = this.state;
      this.handleChangePage(event, page);
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

  onSubmit = (state, data) => {
    const { page } = this.state;
    this.setState({ [state]: false, data: {} }, (event) => {
      this.handleChangePage(event, page);
      console.log('Data Submitted', data);
    });
    return true;
  }

  onSubmitDelete = (data) => {
    const { rowsPerPage, count, page } = this.state;
    const result = count - (page * rowsPerPage);
    this.setState({ openDelete: false, data: {} }, (event) => {
      console.log('Data Submitted', data);
      if (result === 1) {
        this.handleChangePage(event, (page - 1));
      } else {
        this.handleChangePage(event, (page));
      }
    });
  }

  render() {
    const {
      open, order, orderBy, openEdit, data, openDelete, page,
      rowsPerPage, loading, count, tableData,
    } = this.state;
    const { match: { url } } = this.props;
    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <div className={classes.buttonPosition}>
          <Button variant="outlined" color="primary" onClick={this.onOpen} className={classes.button}>
            ADD TRAINEEList
          </Button>
        </div>
        <AddDialog open={open} onClose={() => this.onClose} onSubmit={() => this.onSubmit} />
        <EditDialog
          open={openEdit}
          trainee={data}
          onClose={() => this.onClose}
          onSubmit={() => this.onSubmit}
        />
        <DeleteDialog
          open={openDelete}
          trainee={data}
          onClose={() => this.onClose}
          onSubmit={() => this.onSubmitDelete}
        />
        <TraineeTable
          id="id"
          data={tableData}
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
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          loading={loading}
          dataLength={tableData.length}
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
Trainee.contextType = MyContext;

Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};
