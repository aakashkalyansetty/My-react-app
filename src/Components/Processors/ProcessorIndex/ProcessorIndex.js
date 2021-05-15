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
import './ProcessorIndex.css';
import { URL } from "../../../utils/url";
import Header from "../../Header/Header";
import EditIcon from '@material-ui/icons/Edit';
import TablePagination from '@material-ui/core/TablePagination';
import SearchBar from "material-ui-search-bar";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
  const [status, setStatus]= useState([]);
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
        const response = await fetch(`${URL}/processor/index`,{
          method: "GET",
          headers: {
            "Authorization" : `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        const { data: processor,status, error } = data;
        console.log(data);
        if (status === 200) {
          console.log("success")
          console.log(data.data);
          const processor_data=data.data;
          setData(processor_data)
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

  const editProcessor = (id) => {
    window.location.href=`/ProcessorForm/${id}`;
  };

  const addProcessor = () => {
    window.location.href='/ProcessorForm/_add';
}
 
  const deactivate = async(id) => {
    setIsLoading(true);
        try {
          const response = await fetch(`${URL}/processor/update?id=`+id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
          },
          body: JSON.stringify({
              "status": 0,
          }),
          });
      
          const processor_data = await response.json();
          const {processor_data: status, error } = processor_data;
          console.log(processor_data);
          console.log(processor_data.status);
          if (processor_data.status === 200) {
          console.log("success");
          window.location.href="/ProcessorIndex";
          } else if (processor_data.status === 404) {
          console.log("fail");
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
  }

  const activate = async(id) => {
    setIsLoading(true);
        try {
          const response = await fetch(`${URL}/processor/update?id=`+id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
          },
          body: JSON.stringify({
              "status": 1,
          }),
          });
      
          const processor_data = await response.json();
          const {processor_data: status, error } = processor_data;
          console.log(processor_data);
          console.log(processor_data.status);
          if (processor_data.status === 200) {
          console.log("success");
          window.location.href="/ProcessorIndex";
          } else if (processor_data.status === 404) {
          console.log("fail");
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
  }
  return (
    <div>
      <Header/>
        <h2 className="users">Processors</h2>
      <div className="user_index">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Service</StyledTableCell>
            <StyledTableCell align="center">Transaction Type</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
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
              <StyledTableCell align="left">{data.name}</StyledTableCell>
              <StyledTableCell align="left">{data.service}</StyledTableCell>
              <StyledTableCell align="left">{data.transaction_type}</StyledTableCell>
              <StyledTableCell align="left">{data.status===1 ?"Active":"Inactive"}</StyledTableCell>
              
              <StyledTableCell align="center">
                
                <EditIcon onClick= {() => editProcessor(data.processor_id)} />
                
                {data.status==1 ?<RemoveCircleIcon titleAccess="Deactivate" onClick={() => deactivate(data.processor_id)}/> : <CheckCircleIcon titleAccess="Activate" onClick= {() => activate(data.processor_id)} />}
                 
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
    <button className="btn btn-primary add-user" onClick={addProcessor}>Add Processor</button>
    </div>
    </div>
  );
}