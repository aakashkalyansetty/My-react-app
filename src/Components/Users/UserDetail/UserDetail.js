import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Header from "../../Header/Header";
import Card from "@material-ui/core/Card";
import { URL } from "../../../utils/url";
import './UserDetail.css';

const useStyles = makeStyles({
  table: {
    minWidth: 400, borderColor: 'black',borderStyle: 'thin', 
  },
});

export default function BasicTable(props) {
  const classes = useStyles();
  

  const [view, setView] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState({
    display: false,
    message: "",
    response: ""
  });

  const url= `${URL}/users/` + props.match.params.id;
  const token=localStorage.getItem('token');

    useEffect( async()=>{
      setIsLoading(true);
      try {
        const response = await fetch(url,{
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
          setView(user_data)
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
      
  return (
    <div className="detailView">
      <Header/>
      <br/>
  
   <section className="d-flex">
   <div className="user-table card">
      <h3>User Information</h3>
      
    <TableContainer>
    <Card>
      <Table className={classes.table} aria-label="simple table">        
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Merchant Name
              </TableCell>
              <TableCell align="right">{view.merchant_name}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                First Name
              </TableCell>
              <TableCell align="right">{view.first_name}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Last Name
              </TableCell>
              <TableCell align="right">{view.last_name}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Company Name
              </TableCell>
              <TableCell align="right">{view.company_name}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Processor
              </TableCell>
              <TableCell align="right">{view.processor_name}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Validator
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Address 1
              </TableCell>
              <TableCell align="right">{view.address1}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Address 2
              </TableCell>
              <TableCell align="right">{view.address2}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                City
              </TableCell>
              <TableCell align="right">{view.city}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                State
              </TableCell>
              <TableCell align="right">{view.state}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Zip
              </TableCell>
              <TableCell align="right">{view.zip}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Country
              </TableCell>
              <TableCell align="right">{view.country}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Email
              </TableCell>
              <TableCell align="right">{view.email}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Phone
              </TableCell>
              <TableCell align="right">{view.phone}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Website
              </TableCell>
              <TableCell align="right">{view.website}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Session Timed Out
              </TableCell>
              <TableCell align="right">{view.session_timeout}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                API key
              </TableCell>
              <TableCell align="right">{view.api_key}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                MID
              </TableCell>
              <TableCell align="right">{view.mid_number}</TableCell>
            </TableRow>
         
        </TableBody>
      </Table>
      </Card>
    </TableContainer>
    </div>
    

  <div className="banking-table card">
    <h3>Banking Information</h3>
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
        
            <TableRow>
              <TableCell component="th" scope="row">
                Routing Number
              </TableCell>
              <TableCell align="right">{view.routing_number}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Account Number
              </TableCell>
              <TableCell align="right">{view.account_number}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Account Name
              </TableCell>
              <TableCell align="right">{view.account_name}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Bank Name
              </TableCell>
              <TableCell align="right">{view.bank_name}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Bank Address 1
              </TableCell>
              <TableCell align="right">{view.bank_address1}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Bank Address 2
              </TableCell>
              <TableCell align="right">{view.bank_address2}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Bank City
              </TableCell>
              <TableCell align="right">{view.bank_city}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Bank State
              </TableCell>
              <TableCell align="right">{view.bank_state}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Bank Zip
              </TableCell>
              <TableCell align="right">{view.bank_zip}</TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell component="th" scope="row">
                Bank Country
              </TableCell>
              <TableCell align="right">{view.bank_country}</TableCell>
            </TableRow>
         
        </TableBody>
      </Table>
    </TableContainer>
    </div>
   </section>

    </div>
  );
}
