import React, { useState, useEffect} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './UserIndex.css';
import { URL } from "../../../utils/url";
import Header from "../../Header/Header";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import TablePagination from '@material-ui/core/TablePagination';
import SearchBar from "material-ui-search-bar";
import UserForm from "../UserForm/UserForm";
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14, 
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
  
const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});



export default function CustomizedTables(props) {
  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [showMessage, setShowMessage] = useState({
    display: false,
    message: "",
    response: ""
  });

    const token=localStorage.getItem('token');
    useEffect( async()=>{
      setIsLoading(true);
      try {
        const response = await fetch(`${URL}/users`,{
          method: "GET",
          headers: {
            "Authorization" : `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        const { data: user,status, error } = data;
        console.log(data);
        if (status === 200) {
          console.log("success")
          console.log(data.data);
          const user_data=data.data;
          setData(user_data)
        } else if (status === 404) {
          setShowMessage(({
            display: true,
            message: error,
            response: "error"
          }))
        } else {
          setShowMessage(({
            display: true,
            message: error,
            response: "error"
          }))
        }
      } catch (err) {
        setShowMessage({
          display: true,
          message: err.message,
          response: 'error'
        })
      } finally {
        setIsLoading(false);
      }
    },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const viewUser = (id) => {
    window.location.href=`/UserDetail/${id}`;
  };

  const editUser = (id) => {
    window.location.href=`/UserForm/${id}`;
  };

  const addUser = () => {
    window.location.href='/UserForm/_add';
  }
  
  console.log(data);
  return (
    <div>
      <Header/>
        <h2 className="users">Users</h2>
      <div className="user_index">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">MID</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="center">User Type</StyledTableCell>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Last Name</StyledTableCell>
            <StyledTableCell align="center">Legal Business Name</StyledTableCell>
            <StyledTableCell align="center">DBA</StyledTableCell>
            <StyledTableCell align="center">Functions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <StyledTableRow>
              <StyledTableCell>
              <SearchBar
                placeholder='Search...'
                className="search-bar"
              />
              </StyledTableCell>
              <StyledTableCell>
              <SearchBar
                placeholder='Search...'
                className="search-bar"
              />
              </StyledTableCell>
              <StyledTableCell>
              <SearchBar
                placeholder="Search..."
                className="search-bar"
              />
              </StyledTableCell>
              <StyledTableCell>
              <SearchBar
                placeholder="Search..."
                className="search-bar"
              />
              </StyledTableCell>
              <StyledTableCell>
              <SearchBar
                placeholder="Search..."
                className="search-bar"
              />
              </StyledTableCell>
              <StyledTableCell>
              <SearchBar
                placeholder="Search..."
                className="search-bar"
              />
              </StyledTableCell>
              <StyledTableCell>
              <SearchBar
                placeholder="Search..."
                className="search-bar"
              />
              </StyledTableCell>
            </StyledTableRow>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
            <StyledTableRow key={data.user_id}>
              <StyledTableCell align="left">{data.mid}</StyledTableCell>
              <StyledTableCell align="left">{data.username}</StyledTableCell>
              <StyledTableCell align="left">{data.user_type}</StyledTableCell>
              <StyledTableCell align="left">{data.first_name}</StyledTableCell>
              <StyledTableCell align="left">{data.last_name}</StyledTableCell>
              <StyledTableCell align="left">{data.legal_bussiness_name}</StyledTableCell>
              <StyledTableCell align="left">{data.dba}</StyledTableCell>
              <StyledTableCell align="center">
                 <VisibilityIcon onClick= {() => viewUser(data.user_id)} />
                 <EditIcon onClick= {() => editUser(data.user_id)} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    <button className="btn btn-primary add-user" onClick={addUser}>Add user</button>
    </div>
    </div>
  );
}