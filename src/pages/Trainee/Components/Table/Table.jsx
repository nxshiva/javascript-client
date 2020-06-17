import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withLoaderAndMessage } from '../../../../components/index';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  pagination: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'right',
    width: '100%',
    padding: '0px',
  },
  table: {
    minWidth: 650,
  },
  column: {
    color: 'grey',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      background: '#B6B6B4',
      cursor: 'pointer',
    },
  },
}))(TableRow);

function TraineeTable(props) {
  const {
    id, data, columns, order,
    orderBy, onSort, onSelect, actions,
    count, page, rowsPerPage, onChangePage, onChangeRowsPerPage, dataLength, loading,
  } = props;
  const classes = useStyles();

  const createSortHandler = (property) => (event) => {
    onSort(event, property);
  };


  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              columns && columns.length && columns.map(({ label, align }) => (
                <TableCell align={align} className={classes.column}>
                  <TableSortLabel
                    active={orderBy === label}
                    direction={orderBy === label ? order : 'asc'}
                    onClick={createSortHandler(label)}
                  >
                    {label}
                    {orderBy === label ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))
            }
            <TableCell />
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <div align="center">
                  <CircularProgress color="secondary" />
                </div>
              </TableCell>

            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {dataLength ? data.map((trainee) => (
              <StyledTableRow
                onClick={(event) => onSelect(event, trainee)}
                key={trainee[id]}
              >
                {
                  columns && columns.length && columns.map(({ field, align, format }) => (
                    <TableCell align={align}>
                      {format ? format(trainee[field]) : trainee[field]}
                    </TableCell>
                  ))
                }
                <TableCell>
                  {
                    actions && actions.length && actions.map(({ icon, handler }) => (
                      <div>
                        <Button onClick={() => { handler(trainee); }}>
                          {icon}
                        </Button>
                      </div>
                    ))
                  }
                </TableCell>
              </StyledTableRow>
            )) : (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  <div align="center">
                    <h1>
                      OOPS!, No More Trainees
                    </h1>
                  </div>
                </TableCell>

              </TableRow>
            )}
          </TableBody>
        )}

      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableContainer>
  );
}

const enhancedTable = withLoaderAndMessage(TraineeTable);

export default enhancedTable;

TraineeTable.propTypes = {

  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  dataLength: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
