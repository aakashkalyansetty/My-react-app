import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './ProcessorForm.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { RecentActors } from '@material-ui/icons';
import Header from "../../Header/Header";
import {URL} from "../../../utils/url";
import { useHistory } from "react-router-dom";


const ProcessorForm = (props) =>{
    const [data,setData] = useState({name:'',service:'RCC',transaction_type:'Debit'});
    const [processor,setProcessor]= useState({name:'',service:'RCC',transaction_type:'Debit'});
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState({
      display: false,
      message: "",
      response: ""
    });
    const token=localStorage.getItem('token');
    
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }
    console.log(data);

    useEffect(async(event)=>{
        if(props.match.params.id === '_add'){
        return
    }else{
        try {
            const response = await fetch(`${URL}/processor/view?id=`+props.match.params.id,{
              method: "GET",
              headers: {
                "Authorization" : `Bearer ${token}`,
              },
            });
      
            const data = await response.json();
            console.log(data);
            const status=data.status;
            const error=data.error;
            if (status === 200) {
              console.log("success");
              console.log(data.data[0]);
              const processor_data=data.data[0];
              setData(processor_data);
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
    } 
    },[])  
    
		const submitProccessor =  async(event) => {
      if(props.match.params.id === '_add'){
          setIsLoading(true);
          event.preventDefault();
          try {
            const response = await fetch(`${URL}/processor/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`,
            },
            body: JSON.stringify({
                        "name":data.name,
                        "service":data.service,
                        "transaction_type":data.transaction_type
            }),
            });
        
            const processor_data = await response.json();
            const {processor_data: status, error } = processor_data;
            console.log(processor_data);
            console.log(processor_data.status);
            if (processor_data.status === 201) {
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
      else{
        setIsLoading(true);
        event.preventDefault();
        try {
          const response = await fetch(`${URL}/processor/update?id=`+props.match.params.id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
          },
          body: JSON.stringify({
                      "name":data.name,
                      "service":data.service,
                      "transaction_type":data.transaction_type
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
			};
      
      const getTitle=()=>{
        if(props.match.params.id === '_add'){
            return <h3>Create Processor</h3>
        }else{
            return <h3>Update Processor</h3>
        }
      }

      const getButton=()=>{
        if(props.match.params.id === '_add'){
            return <strong>Create</strong>
        }else{
            return <strong>Update</strong>
        }
      }

        return (
            <div>
                <Header />
                {getTitle()}
                <div className="outline1" >
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField required id="outlined-basic" onChange={handleChange} name="name" label="Name" value={data.name} variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" className="dropdown">
                            <InputLabel required htmlFor="outlined-age-native-simple">Service(s) </InputLabel>
                            <Select
                                native
                                label="Service"
                                inputProps={{
                                    name: 'service',
                                    id: 'outlined-age-native-simple',
                                }}
                                onChange = {handleChange}
                                value={data.service}
                            >
                                <option >RCC </option>

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl variant="outlined" className="dropdown">
                            <InputLabel required={true} htmlFor="outlined-age-native-simple">Transaction Type </InputLabel>
                            <Select
                                native
                                value={data.transaction_type}
                                label="Transaction Type"
                                inputProps={{
                                    name: 'transaction_type',
                                    id: 'outlined-age-native-simple',
                                }}
                                
                                onChange = {handleChange}
                            >
                                <option >Debit </option>
                                <option >Credit </option>
                                <option > Debit and Credit</option>

                            </Select>
                            </FormControl>
                            </Grid>
                        </Grid>
                        <button
                            class="btn btn-primary nextbtn"
                            onClick={submitProccessor}
                            type="submit">
                            {getButton()}
                        </button>

                    </form>


                </div>
            </div>

        );
    }

export default ProcessorForm;
