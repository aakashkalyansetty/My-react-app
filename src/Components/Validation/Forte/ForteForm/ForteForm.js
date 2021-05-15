import React from 'react';
import './ForteForm.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Header from "../../../Header/Header";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const ForteForm = () =>{

 return(
        <div>
          <Header/>
            <h3>Create Validation Type</h3>
            <div className ="outline1" >
            <form noValidate autoComplete="off" >
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <TextField required id="outlined-basic" label="Validation" variant="outlined" value="Forte" disabled />
            </Grid>
            <Grid item xs={6}>
            <FormControl component="fieldset">
            <FormLabel required component="legend">Select merchant</FormLabel>
                <RadioGroup required={true} aria-label="gender" name="gender1">
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="specific" control={<Radio />} label="Specific" />
                </RadioGroup>
            </FormControl>
            </Grid>
        </Grid>
          <button
             class="btn btn-primary nextbtn"
             type="submit">
          <strong>Create</strong>
         </button>

          </form>

          
            </div>
        </div>

    )
}

export default ForteForm;
