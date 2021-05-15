import React, {useState, useEffect} from 'react';
import { Tab, Tabs} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import './UserForm.css';
import { URL } from "../../../utils/url";
import Header from "../../Header/Header";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


const UserForm=(props)=>{
  const [key,setKey] = useState("gateway-details");
  const [file,setFile] = useState();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState({
    display: false,
    message: "",
    response: ""
  });
  
  
  const [data,setData] = useState(
	{
		username:'', api_key:'', name:'', validation:'', check_type:'Personal Check', role_id:'Merchant',
		session_timeout:'7200',
		first_name:'', last_name:'',phone:'', websiteurl:'',
		dba:'', address1:'',address2:'', city:'',state:'',zip:'',country:'United States',
		company_name:'',laddress1:'', laddress2:'',lcity:'',lstate:'',
		lzip:'', lcountry:'United States',
		account_name:'',routing_number:'',bank_name:'', account_number:'',bank_address1:'',bank_address2:'',
		bank_city:'', bank_state:'',bank_zip:'', bank_country:'United States',
		authorization_fee:'', capture_fee:'',gateway_transation_fee:'', chargeback_fee:'',
		 standardreturn_fee:'',retrieval_request:'',refunds:'',monthly:'',gateway_monthly:'', settlement_fee:'',
		annual:'', customer_service:'',
		miscellaneous:'', reserve:'',settling:'', resellers:'',buy_rate:'',
		sell_rate:'',split:'',discount:'',setup:'',
		});
		
		useEffect(async(event)=>{
			if(props.match.params.id === '_add'){
			return
		}else{
			try {
				const response = await fetch(`${URL}/users/`+props.match.params.id,{
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
				  console.log(data.data);
				  const user_data=data.data;
				  setData(user_data);
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

		const token=localStorage.getItem('token');
	const createUser =  async(event) => {
		if(props.match.params.id === '_add'){
			setIsLoading(true);
			event.preventDefault();
			const formData = new FormData();
    		formData.append("merchant_signature", file);
			try {
			  const response = await fetch(`${URL}/users`, {
				method: "POST",
				headers: {
				  "Content-Type": "application/json multipart/form-data",
				  "Authorization" : `Bearer ${token}`,
				},
				body: JSON.stringify({
					"role_id": 1,
					"username":data.username, "processor_id": 1, "validation_id": 1, "check_type":data.check_type,
					"session_timeout":"7200" ,
					"first_name":data.first_name, "last_name":data.last_name,"phone":data.phone, "websiteurl":data.websiteurl,
					"dba":data.dba, "address1":data.address1," address2":data.address2, "city":data.city,"state":data.state,"zip":data.zip,country:'United States',
					"company_name":data.company_name,"laddress1":data.laddress1, "laddress2":data.laddress2,"lcity":data.lcity,"lstate":data.lstate,
					"lzip":data.lzip, "lcountry":'United States',
					formData,
					"account_name":data.account_name,"routing_number":data.routing_number,"bank_name":data.bank_name, "account_number":data.account_number,
					"bank_address1":data.bank_address1,"bank_address2":data.bank_address2,
					"bank_city":data.bank_city, "bank_state":data.bank_state,"bank_zip":data.bank_zip, "bank_country":'United States',
					"authorization_fee":data.authorization_fee, "capture_fee":data.capture_fee,"gateway_transaction_fee":data.gateway_transaction_fee, "chargeback_fee":data.chargeback_fee,
					 "standardreturn_fee":data.standardreturn_fee,"retrieval_request":data.retrieval_request,"refunds":data.refunds,"monthly":data.monthly,"gateway_monthly":data.gateway_monthly, "settlement_fee":data.settlement_fee,
					"annual":data.annual, "customer_service":data.customer_service,
					"miscellaneous":data.miscellaneous, "reserve":data.reserve,"settling":data.settling, "resellers":data.resellers,"buy_rate":data.buy_rate,
					"sell_rate":data.sell_rate,"split":data.split,"discount":data.discount,"setup":data.setup,
				}),
			  });
		
			  const user_data = await response.json();
			  const {user_data: user,status, error } = user_data;
			  console.log(user_data);	
			  if (status === 201) {
				console.log("success");
				window.location.href="/UserIndex";
			  } else if (status === 404) {
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
			  const response = await fetch(`${URL}/user/update?id=`+props.match.params.id, {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				  "Authorization" : `Bearer ${token}`,
				},
				body: JSON.stringify({
					"role_id": 1,
					"username":data.username, "processor_id": 1, "validation_id": 1, "check_type":data.check_type,
					"session_timeout":"7200" ,
					"first_name":data.first_name, "last_name":data.last_name,"phone":data.phone, "websiteurl":data.websiteurl,
					"dba":data.dba, "address1":data.address1," address2":data.address2, "city":data.city,"state":data.state,"zip":data.zip,country:'United States',
					"company_name":data.company_name,"laddress1":data.laddress1, "laddress2":data.laddress2,"lcity":data.lcity,"lstate":data.lstate,
					"lzip":data.lzip, "lcountry":'United States',
					"account_name":data.account_name,"routing_number":data.routing_number,"bank_name":data.bank_name, "account_number":data.account_number,
					"bank_address1":data.bank_address1,"bank_address2":data.bank_address2,
					"bank_city":data.bank_city, "bank_state":data.bank_state,"bank_zip":data.bank_zip, "bank_country":'United States',
					"authorization_fee":data.authorization_fee, "capture_fee":data.capture_fee,"gateway_transaction_fee":data.gateway_transaction_fee, "chargeback_fee":data.chargeback_fee,
					 "standardreturn_fee":data.standardreturn_fee,"retrieval_request":data.retrieval_request,"refunds":data.refunds,"monthly":data.monthly,"gateway_monthly":data.gateway_monthly, "settlement_fee":data.settlement_fee,
					"annual":data.annual, "customer_service":data.customer_service,
					"miscellaneous":data.miscellaneous, "reserve":data.reserve,"settling":data.settling, "resellers":data.resellers,"buy_rate":data.buy_rate,
					"sell_rate":data.sell_rate,"split":data.split,"discount":data.discount,"setup":data.setup,
				}),
			  });
		
			  const user_data = await response.json();
			  const {user_data: user,status, error } = user_data;
			  console.log(user_data);	
			  if (status === 201) {
				console.log("success");
				window.location.href="/UserIndex";
			  } else if (status === 404) {
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


const getTitle = () => {
	if(props.match.params.id === '_add'){
		return <h2>Create User</h2>
	}
	else{
		return <h2>Update User</h2>
	}
}

const getButton=()=>{
	if(props.match.params.id === '_add'){
		return <strong>Create</strong>
	}else{
		return <strong>Update</strong>
	}
  }

const handleChangeData = (event) => {
	setData({...data, [event.target.name]: event.target.value});
}

const signatureUpload = (event) => {
	setFile(event.target.files[0]);
}


  return (
      <div>
          <Header />
          <br/> 
        {getTitle()}
        <br/>
    <div className ="outline1"> 
    <div className ="outline">
    <div>

      
	<div>
		<Tabs activeKey={key} onSelect={(k) => setKey(k)} id="controlled-tab-example">
		
		<Tab eventKey="gateway-details" title="Gateway Details">
		<form>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField required={true} name= "username" value={data.username} onChange={handleChangeData} id="outlined-basic" label="Username" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField disabled name= "api_key" onChange={handleChangeData} id="outlined-basic" label="API Key" variant="outlined" />
          </Grid> 
          <Grid item xs={6}>
          <FormControl required className="picklist">
          <InputLabel shrink htmlFor="select-multiple-native">
               Processor  
          </InputLabel>
          <Select 
				value={data.processor_name}
				onChange={handleChangeData}
                multiple
                native
                inputProps={{
				name:'name',
                 id: 'select-multiple-native',
                 }}
            >
            <option> GFC Financial DD </option>
            <option> SBI</option>
            <option> AB </option>
          </Select>
      </FormControl>
      </Grid>
       <Grid item xs={6}>
         <FormControl required className="picklist">
          <InputLabel shrink htmlFor="select-multiple-native">
                 Validation
          </InputLabel>
          <Select
				multiple
				onChange={handleChangeData}
                native
                inputProps={{
				name: 'validation',
                 id: 'select-multiple-native',
                 }}
            >
            <option> Black List  </option>
            <option> Duplicate Check</option>
            <option> Forte </option>
         </Select>
      </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl required variant="outlined" className= "dropdown">
        <InputLabel htmlFor="outlined-age-native-simple">Check Type </InputLabel>
        <Select
          native
		  onChange={handleChangeData}
          label="Check Type"
          inputProps={{
            name: 'check_type',
            id: 'outlined-age-native-simple',
          }}
        >
          <option >Personal Check</option>
          <option >Business Check </option>
          
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={6}>
            <TextField required value={data.session_timeout} name="session_timeout" onChange={handleChangeData} id="outlined-basic" label="Session Time out" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <FormControl variant="outlined" className="dropdown">
        <InputLabel htmlFor="outlined-age-native-simple">User Type </InputLabel>
        <Select
		  onChange={handleChangeData}
		 required
          native
          label="User Type"
          inputProps={{
            name: 'role_id',
            id: 'outlined-age-native-simple',
          }}
        >
          <option >Merchant</option>
          <option >DD Merchant </option>
          
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={6}>
            <TextField disabled name="mid" onChange={handleChangeData}id="outlined-basic" label="MID" variant="outlined" />
            </Grid>
         </Grid>
        </form>
      <section className ="d-flex justify-content-end">
        <button
		 class="btn btn-primary nextbtn"
		 onClick={(k) => setKey('general-details')}
         >
			 
         <strong>Next</strong>
        </button>
      </section>

		</Tab>
		<Tab eventKey="general-details" title="General Details">
		<form noValidate autoComplete="off">
        <Grid container spacing={3}>
            <Grid item xs={6}>
             <TextField required={true} value={data.first_name} name="first_name" onChange={handleChangeData}id="outlined-basic" label="First Name" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
             <TextField required={true} value={data.last_name} name="last_name" onChange={handleChangeData} id="outlined-basic" label="Last Name" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
             <TextField required={true} value={data.phone} name="phone" onChange={handleChangeData} id="outlined-basic" label="Phone" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
             <TextField required={true} value={data.website} name="websiteurl" onChange={handleChangeData}id="outlined-basic" label="Website" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <label htmlFor="raised-button-file"> Merchant Signature</label>
            <input
              accept="image/*"
              id="raised-button-file"
			  type="file"
			  onChange={signatureUpload}
			  name="merchant_signature"
            />
          </Grid>
        </Grid>
        
            
        </form>
       <section className="d-flex justify-content-between">
          <button
               
            class="btn btn-primary prevbtn"
			onClick={(k) => setKey('gateway-details')}>
           <strong>Previous</strong>
          </button>
          <button
            class="btn btn-primary nextbtn"
            onClick={(k) => setKey('dba-address')}>
          <strong>Next</strong>
         </button>
        </section>
		</Tab>
		<Tab eventKey="dba-address" title="DBA Address">
		<form noValidate autoComplete="off">
      <Grid container spacing={3}>
            <Grid item xs={6}>
            <TextField required={true} name="dba" onChange={handleChangeData} id="outlined-basic" label="DBA(Descriptor)" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="address1" onChange={handleChangeData} id="outlined-basic" label="Address1" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="address2" onChange={handleChangeData} id="outlined-basic" label="Address2" variant="outlined" />
            </Grid>
            
            <Grid item xs={6}>
            <TextField name="city" onChange={handleChangeData} id="outlined-basic" label="City" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="state" onChange={handleChangeData} id="outlined-basic" label="State" variant="outlined" />
            </Grid>
           
            <Grid item xs={6}>
            <TextField name="zip" onChange={handleChangeData} id="outlined-basic" label="ZIP" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <FormControl variant="outlined" className="dropdown">
        <InputLabel   htmlFor="outlined-age-native-simple">Country </InputLabel>         
        <Select
          native
          onChange={handleChangeData}
          label="Country"
          inputProps={{
            name: 'country',
            id: 'outlined-age-native-simple',
          }}
        >
	  <option > United States </option>
    <option >Afghanistan</option>
    <option > Albania </option>
	  <option >Algeria  </option>
	  <option > Andorra </option>
	  <option > Angola </option>
	  <option > Antigua and Barbuda </option>
	  <option > Argentina </option>
	  <option > Armenia </option>
	  <option > Australia </option>
	  <option > Austria </option>
	  <option > Azerbaijan </option>
	  <option >Bahamas  </option>
	  <option > Bahrain </option>
	  <option > Bangladesh </option>
	  <option > Barbados </option>
	  <option > Belarus </option>
	  <option > Belgium  </option>
	  <option > Belize </option>
	  <option > Benin </option>
	  <option > Bhutan </option>
	  <option > Bolivia  </option>
	  <option > Bosnia and Herzegovina </option>
	  <option > Botswana </option>
	  <option >Brazil  </option>
	  <option >Brunei  </option>
	  <option > Bulgaria </option>
	  <option >Burkina Faso  </option>
	  <option > Burundi </option>
	  <option > Cabo Verde </option>
	  <option >Cambodia  </option>
	  <option > Cameroon </option>
	  <option > Canada  </option>
    <option > Central African Republic (CAR) </option>
	  <option > Chad  </option>
	  <option > Chile </option>
	  <option > China </option>
	  <option > Colombia </option>
	  <option > Comoros </option>
	  <option > Congo, Democratic Republic of the </option>
	  <option > Congo, Republic of the  </option>
	  <option >Costa Rica  </option>
	  <option > Cote d'Ivoire </option>
	  <option > Croatia </option>
	  <option > Cuba </option>
	  <option > Cyprus </option>
	  <option > Czechia </option>
	  <option > Denmark </option>
	  <option > Djibouti </option>
	  <option > Dominica </option>
	  <option > Dominican Republic </option>
	  <option > Ecuador </option>
	  <option >Egypt  </option>
	  <option >El Salvador  </option>
	  <option > Equatorial Guinea </option>
	  <option > Eritrea </option>
	  <option >Estonia  </option>
	  <option > Eswatini (formerly Swaziland) </option>
	  <option > Ethiopia </option>
	  <option > Fiji</option>
	  <option > Finland </option>
	  <option > France </option>
	  <option > Gabon </option>
	  <option > Gambia </option>
	  <option > Georgia </option>
	  <option > Germany </option>
	  <option > Ghana </option>
	  <option > Greece </option>
	  <option > Grenada </option>
	  <option > Guatemala </option>
	  <option > Guinea </option>
	  <option >Guinea-Bissau </option>
	  <option >Guyana  </option>
	  <option > Haiti  </option>
	  <option > Honduras </option>
	  <option > Hungary </option>
	  <option >  Iceland </option>
	  <option > India </option>
	  <option > Indonesia  </option>
	  <option > Iran </option>
	  <option > Iraq </option>
	  <option > Ireland </option>
	  <option > Israel </option>
	  <option > Italy </option>
	  <option > Jamaica </option>
	  <option > Japan </option>
	  <option >Jordan  </option>
	  <option >  Kazakhstan </option>
	  <option >Kenya  </option>
	  <option > Kiribati </option>
	  <option > Kosovo </option>
	  <option > Kuwait </option>
	  <option > Kyrgyzstan  </option>
	  <option > Laos </option>
	  <option > Latvia  </option>
	  <option > Lebanon  </option>
	  <option > Lesotho  </option>
	  <option > Liberia  </option>
	  <option > Libya </option>
	  <option > Liechtenstein </option>
	  <option > Lithuania  </option>
	  <option > Luxembourg  </option>
	  <option >Madagascar  </option>
	  <option > Malawi </option>
	  <option > Malaysia </option>
	  <option > Maldives  </option>
	  <option > Mali </option>
	  <option > Malta </option>
	  <option > Marshall Islands  </option>
	  <option > Mauritius </option>
	  <option > Mexico </option>
	   <option > Micronesia </option>
	  <option > Moldova </option>
	  <option > Monaco </option>
	  <option > Mongolia </option>
	  <option > Montenegro </option>
	  <option > Morocco  </option>
	  <option > Mozambique </option>
	  <option > Myanmar (formerly Burma) </option>
	  <option > Namibia </option>
	  <option > Nauru </option>
	  <option > Nepal </option>
	  <option > Netherlands </option>
	  <option > New Zealand </option>
    <option > Nicaragua </option>
	  <option > Niger </option>
	  <option > Nigeria </option>
	  <option > North Korea </option>
	  <option > North Macedonia (formerly Macedonia) </option>
	  <option > Norway </option>
	  <option > Oman </option>
	  <option >  Pakistan </option>
	  <option > Palau </option>
	  <option > Palestine </option>
	  <option > Panama </option>
	  <option > Papua New Guinea </option>
	  <option > Paraguay </option>
	  <option >Peru  </option>
	  <option > Philippines </option>
    <option >Poland  </option>
	  <option > Portugal </option>
	  <option > Qatar </option>
	  <option > Romania </option>
	  <option >Russia </option>
	  <option > Rwanda  </option>
	  <option >Saint Kitts and Nevis  </option>
	  <option >Saint Lucia  </option>
	  <option > Saint Vincent and the Grenadines </option>
	  <option > Samoa </option>
	  <option > San Marino </option>
	  <option > Sao Tome and Principel </option>
	  <option > Saudi Arabia  </option>
	  <option > Senegal  </option>
	  <option > Serbia </option>
	  <option > Seychelles </option>
	  <option > Sierra Leone </option>
	  <option > Singapore </option>
	  <option > Slovakia </option>
	  <option > Slovenia </option>
	  <option > Solomon Islands </option>
	  <option >Somalia  </option>
    <option >South Africa  </option>
	  <option >South Korea  </option>
	  <option > South Sudan </option>
	  <option > Spain </option>
	  <option > Sri Lanka </option>
	  <option >Sudan  </option>
	  <option >Suriname  </option>
	  <option > Sweden </option>
	  <option > Switzerland  </option>
	  <option > Syria </option>
	  <option >Taiwan  </option>
	  <option > Tajikistan </option>
	  <option > Tanzania </option>
	  <option > Thailand </option>
	  <option >Timor-Leste  </option>
	  <option > Togo </option>
	  <option > Tonga </option>
	  <option > Trinidad and Tobago </option>
	  <option > Tunisia </option>
	  <option > Turkey </option>
	  <option >Turkmenistan  </option>
	  <option > Tuvalu </option>
	  <option > Uganda </option>
	  <option > Ukraine </option>
    <option > United Arab Emirates (UAE) </option>
	  <option > United Kingdom (UK) </option>
	  <option > Uruguay </option>
	  <option > Uzbekistan </option>
	  <option >   Vanuatu </option>
	  <option > Vatican City (Holy See) </option>
	  <option > Venezuela </option>
	  <option > Vietnam </option>
	  <option > Yemen  </option>
	  <option >   Zambia </option>
	  <option > Zimbabwe </option>
    </Select>
    </FormControl>
      </Grid>
      </Grid>
        </form>
        <section className="d-flex justify-content-between">
        <button name="previous" onChange={handleChangeData}
           class="btn btn-primary prevbtn"
		   onClick={(k) => setKey('general-details')}>
          <strong>Previous</strong>
        </button>
        <button name="next" onChange={handleChangeData}
           class="btn btn-primary nextbtn"
           onClick={(k) => setKey('legal-address')}>
           <strong>Next</strong>
        </button>
        </section>

		</Tab>
		<Tab eventKey="legal-address" title="Legal Address">
		<form noValidate autoComplete="off">
      <Grid container spacing={3}>
            <Grid item xs={6}>
            <TextField required={true} name="company_name" onChange={handleChangeData} id="outlined-basic" label="Legal Business Name" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="laddress1" onChange={handleChangeData}  id="outlined-basic" label="Address1" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="laddress2" onChange={handleChangeData} id="outlined-basic" label="Address2" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
           
            <TextField name="lcity" onChange={handleChangeData} id="outlined-basic" label="City" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="lstate" onChange={handleChangeData} id="outlined-basic" label="State" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            
            <TextField  name="lzip" onChange={handleChangeData} id="outlined-basic" label="ZIP" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <FormControl variant="outlined" className="dropdown">
        <InputLabel  htmlFor="outlined-age-native-simple">Country </InputLabel>         
		<Select 
		 onChange={handleChangeData}
          native
          label="Country"
          inputProps={{
            name: 'lcountry',
            id: 'outlined-age-native-simple',
          }}
        >
	  <option > United States </option>
    <option >Afghanistan</option>
    <option > Albania </option>
	  <option >Algeria  </option>
	  <option > Andorra </option>
	  <option > Angola </option>
	  <option > Antigua and Barbuda </option>
	  <option > Argentina </option>
	  <option > Armenia </option>
	  <option > Australia </option>
	  <option > Austria </option>
	  <option > Azerbaijan </option>
	  <option >Bahamas  </option>
	  <option > Bahrain </option>
	  <option > Bangladesh </option>
	  <option > Barbados </option>
	  <option > Belarus </option>
	  <option > Belgium  </option>
	  <option > Belize </option>
	  <option > Benin </option>
	  <option > Bhutan </option>
	  <option > Bolivia  </option>
	  <option > Bosnia and Herzegovina </option>
	  <option > Botswana </option>
	  <option >Brazil  </option>
	  <option >Brunei  </option>
	  <option > Bulgaria </option>
	  <option >Burkina Faso  </option>
	  <option > Burundi </option>
	  <option > Cabo Verde </option>
	  <option >Cambodia  </option>
	  <option > Cameroon </option>
	  <option > Canada  </option>
    <option > Central African Republic (CAR) </option>
	  <option > Chad  </option>
	  <option > Chile </option>
	  <option > China </option>
	  <option > Colombia </option>
	  <option > Comoros </option>
	  <option > Congo, Democratic Republic of the </option>
	  <option > Congo, Republic of the  </option>
	  <option >Costa Rica  </option>
	  <option > Cote d'Ivoire </option>
	  <option > Croatia </option>
	  <option > Cuba </option>
	  <option > Cyprus </option>
	  <option > Czechia </option>
	  <option > Denmark </option>
	  <option > Djibouti </option>
	  <option > Dominica </option>
	  <option > Dominican Republic </option>
	  <option > Ecuador </option>
	  <option >Egypt  </option>
	  <option >El Salvador  </option>
	  <option > Equatorial Guinea </option>
	  <option > Eritrea </option>
	  <option >Estonia  </option>
	  <option > Eswatini (formerly Swaziland) </option>
	  <option > Ethiopia </option>
	  <option > Fiji</option>
	  <option > Finland </option>
	  <option > France </option>
	  <option > Gabon </option>
	  <option > Gambia </option>
	  <option > Georgia </option>
	  <option > Germany </option>
	  <option > Ghana </option>
	  <option > Greece </option>
	  <option > Grenada </option>
	  <option > Guatemala </option>
	  <option > Guinea </option>
	  <option >Guinea-Bissau </option>
	  <option >Guyana  </option>
	  <option > Haiti  </option>
	  <option > Honduras </option>
	  <option > Hungary </option>
	  <option >  Iceland </option>
	  <option > India </option>
	  <option > Indonesia  </option>
	  <option > Iran </option>
	  <option > Iraq </option>
	  <option > Ireland </option>
	  <option > Israel </option>
	  <option > Italy </option>
	  <option > Jamaica </option>
	  <option > Japan </option>
	  <option >Jordan  </option>
	  <option >  Kazakhstan </option>
	  <option >Kenya  </option>
	  <option > Kiribati </option>
	  <option > Kosovo </option>
	  <option > Kuwait </option>
	  <option > Kyrgyzstan  </option>
	  <option > Laos </option>
	  <option > Latvia  </option>
	  <option > Lebanon  </option>
	  <option > Lesotho  </option>
	  <option > Liberia  </option>
	  <option > Libya </option>
	  <option > Liechtenstein </option>
	  <option > Lithuania  </option>
	  <option > Luxembourg  </option>
	  <option >Madagascar  </option>
	  <option > Malawi </option>
	  <option > Malaysia </option>
	  <option > Maldives  </option>
	  <option > Mali </option>
	  <option > Malta </option>
	  <option > Marshall Islands  </option>
	  <option > Mauritius </option>
	  <option > Mexico </option>
	   <option > Micronesia </option>
	  <option > Moldova </option>
	  <option > Monaco </option>
	  <option > Mongolia </option>
	  <option > Montenegro </option>
	  <option > Morocco  </option>
	  <option > Mozambique </option>
	  <option > Myanmar (formerly Burma) </option>
	  <option > Namibia </option>
	  <option > Nauru </option>
	  <option > Nepal </option>
	  <option > Netherlands </option>
	  <option > New Zealand </option>
    <option > Nicaragua </option>
	  <option > Niger </option>
	  <option > Nigeria </option>
	  <option > North Korea </option>
	  <option > North Macedonia (formerly Macedonia) </option>
	  <option > Norway </option>
	  <option > Oman </option>
	  <option >  Pakistan </option>
	  <option > Palau </option>
	  <option > Palestine </option>
	  <option > Panama </option>
	  <option > Papua New Guinea </option>
	  <option > Paraguay </option>
	  <option >Peru  </option>
	  <option > Philippines </option>
    <option >Poland  </option>
	  <option > Portugal </option>
	  <option > Qatar </option>
	  <option > Romania </option>
	  <option >Russia </option>
	  <option > Rwanda  </option>
	  <option >Saint Kitts and Nevis  </option>
	  <option >Saint Lucia  </option>
	  <option > Saint Vincent and the Grenadines </option>
	  <option > Samoa </option>
	  <option > San Marino </option>
	  <option > Sao Tome and Principel </option>
	  <option > Saudi Arabia  </option>
	  <option > Senegal  </option>
	  <option > Serbia </option>
	  <option > Seychelles </option>
	  <option > Sierra Leone </option>
	  <option > Singapore </option>
	  <option > Slovakia </option>
	  <option > Slovenia </option>
	  <option > Solomon Islands </option>
	  <option >Somalia  </option>
    <option >South Africa  </option>
	  <option >South Korea  </option>
	  <option > South Sudan </option>
	  <option > Spain </option>
	  <option > Sri Lanka </option>
	  <option >Sudan  </option>
	  <option >Suriname  </option>
	  <option > Sweden </option>
	  <option > Switzerland  </option>
	  <option > Syria </option>
	  <option >Taiwan  </option>
	  <option > Tajikistan </option>
	  <option > Tanzania </option>
	  <option > Thailand </option>
	  <option >Timor-Leste  </option>
	  <option > Togo </option>
	  <option > Tonga </option>
	  <option > Trinidad and Tobago </option>
	  <option > Tunisia </option>
	  <option > Turkey </option>
	  <option >Turkmenistan  </option>
	  <option > Tuvalu </option>
	  <option > Uganda </option>
	  <option > Ukraine </option>
    <option > United Arab Emirates (UAE) </option>
	  <option > United Kingdom (UK) </option>
	  <option > Uruguay </option>
	  <option > Uzbekistan </option>
	  <option >   Vanuatu </option>
	  <option > Vatican City (Holy See) </option>
	  <option > Venezuela </option>
	  <option > Vietnam </option>
	  <option > Yemen  </option>
	  <option >   Zambia </option>
	  <option > Zimbabwe </option>
       </Select>
     </FormControl>
            </Grid>
           </Grid>

        </form>
        <section className="d-flex justify-content-between">
       
         <button
            class="btn btn-primary prevbtn"
            onClick={(k) => setKey('dba-address')}>
          <strong>Previous</strong>
         </button>
         <button
            class="btn btn-primary nextbtn"
            onClick={(k) => setKey('bank-details')}>
         <strong>Next</strong>
         </button>
        </section>

		</Tab>
		<Tab eventKey="bank-details" title="Bank Details">
		<form noValidate autoComplete="off">
        <Grid container spacing={3}>
            <Grid item xs={6}>
            <TextField  required={true} value={data.account_name} name="account_name" onChange={handleChangeData} id="outlined-basic" label="Name on Address" variant="outlined"/>
            </Grid>
            <Grid item xs={6}>
			<TextField required={true} value={data.routing_number} name="routing_number" onChange={handleChangeData} id="outlined-basic" label="Routing Number" variant="outlined" />
            </Grid>
			<Grid item xs={6}>
			<TextField required={true} value={data.bank_name} name="bank_name" onChange={handleChangeData} id="outlined-basic" label="Bank Name" variant="outlined" />
            </Grid>
			<Grid item xs={6}>
			<TextField required={true} value={data.account_number} name="account_number" onChange={handleChangeData} id="outlined-basic" label="Account Number" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="bank_address1" value={data.bank_address1} onChange={handleChangeData} id="outlined-basic" label="Bank Address1" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="bank_address2" value={data.bank_address2} onChange={handleChangeData}id="outlined-basic" label="Bank Address2" variant="outlined"/>
            </Grid>
            <Grid item xs={6}>
            <TextField name="bank_city" value={data.bank_city} onChange={handleChangeData} id="outlined-basic" label="Bank City" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="bank_state" value={data.bank_state} onChange={handleChangeData} id="outlined-basic" label="Bank State" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="bank_zip" value={data.bank_zip} onChange={handleChangeData} id="outlined-basic" label="Bank ZIP" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <FormControl variant="outlined" className="dropdown">
        <InputLabel htmlFor="outlined-age-native-simple">Country </InputLabel>         
        <Select
		 onChange={handleChangeData}
          native
          label="Country"
          inputProps={{
            name: 'bank_country',
            id: 'outlined-age-native-simple',
          }}
        >
	  <option > United States </option>
    <option >Afghanistan</option>
    <option > Albania </option>
	  <option >Algeria  </option>
	  <option > Andorra </option>
	  <option > Angola </option>
	  <option > Antigua and Barbuda </option>
	  <option > Argentina </option>
	  <option > Armenia </option>
	  <option > Australia </option>
	  <option > Austria </option>
	  <option > Azerbaijan </option>
	  <option >Bahamas  </option>
	  <option > Bahrain </option>
	  <option > Bangladesh </option>
	  <option > Barbados </option>
	  <option > Belarus </option>
	  <option > Belgium  </option>
	  <option > Belize </option>
	  <option > Benin </option>
	  <option > Bhutan </option>
	  <option > Bolivia  </option>
	  <option > Bosnia and Herzegovina </option>
	  <option > Botswana </option>
	  <option >Brazil  </option>
	  <option >Brunei  </option>
	  <option > Bulgaria </option>
	  <option >Burkina Faso  </option>
	  <option > Burundi </option>
	  <option > Cabo Verde </option>
	  <option >Cambodia  </option>
	  <option > Cameroon </option>
	  <option > Canada  </option>
    <option > Central African Republic (CAR) </option>
	  <option > Chad  </option>
	  <option > Chile </option>
	  <option > China </option>
	  <option > Colombia </option>
	  <option > Comoros </option>
	  <option > Congo, Democratic Republic of the </option>
	  <option > Congo, Republic of the  </option>
	  <option >Costa Rica  </option>
	  <option > Cote d'Ivoire </option>
	  <option > Croatia </option>
	  <option > Cuba </option>
	  <option > Cyprus </option>
	  <option > Czechia </option>
	  <option > Denmark </option>
	  <option > Djibouti </option>
	  <option > Dominica </option>
	  <option > Dominican Republic </option>
	  <option > Ecuador </option>
	  <option >Egypt  </option>
	  <option >El Salvador  </option>
	  <option > Equatorial Guinea </option>
	  <option > Eritrea </option>
	  <option >Estonia  </option>
	  <option > Eswatini (formerly Swaziland) </option>
	  <option > Ethiopia </option>
	  <option > Fiji</option>
	  <option > Finland </option>
	  <option > France </option>
	  <option > Gabon </option>
	  <option > Gambia </option>
	  <option > Georgia </option>
	  <option > Germany </option>
	  <option > Ghana </option>
	  <option > Greece </option>
	  <option > Grenada </option>
	  <option > Guatemala </option>
	  <option > Guinea </option>
	  <option >Guinea-Bissau </option>
	  <option >Guyana  </option>
	  <option > Haiti  </option>
	  <option > Honduras </option>
	  <option > Hungary </option>
	  <option >  Iceland </option>
	  <option > India </option>
	  <option > Indonesia  </option>
	  <option > Iran </option>
	  <option > Iraq </option>
	  <option > Ireland </option>
	  <option > Israel </option>
	  <option > Italy </option>
	  <option > Jamaica </option>
	  <option > Japan </option>
	  <option >Jordan  </option>
	  <option >  Kazakhstan </option>
	  <option >Kenya  </option>
	  <option > Kiribati </option>
	  <option > Kosovo </option>
	  <option > Kuwait </option>
	  <option > Kyrgyzstan  </option>
	  <option > Laos </option>
	  <option > Latvia  </option>
	  <option > Lebanon  </option>
	  <option > Lesotho  </option>
	  <option > Liberia  </option>
	  <option > Libya </option>
	  <option > Liechtenstein </option>
	  <option > Lithuania  </option>
	  <option > Luxembourg  </option>
	  <option >Madagascar  </option>
	  <option > Malawi </option>
	  <option > Malaysia </option>
	  <option > Maldives  </option>
	  <option > Mali </option>
	  <option > Malta </option>
	  <option > Marshall Islands  </option>
	  <option > Mauritius </option>
	  <option > Mexico </option>
	  <option > Micronesia </option>
	  <option > Moldova </option>
	  <option > Monaco </option>
	  <option > Mongolia </option>
	  <option > Montenegro </option>
	  <option > Morocco  </option>
	  <option > Mozambique </option>
	  <option > Myanmar (formerly Burma) </option>
	  <option > Namibia </option>
	  <option > Nauru </option>
	  <option > Nepal </option>
	  <option > Netherlands </option>
	  <option > New Zealand </option>
    <option > Nicaragua </option>
	  <option > Niger </option>
	  <option > Nigeria </option>
	  <option > North Korea </option>
	  <option > North Macedonia (formerly Macedonia) </option>
	  <option > Norway </option>
	  <option > Oman </option>
	  <option >  Pakistan </option>
	  <option > Palau </option>
	  <option > Palestine </option>
	  <option > Panama </option>
	  <option > Papua New Guinea </option>
	  <option > Paraguay </option>
	  <option >Peru  </option>
	  <option > Philippines </option>
    <option >Poland  </option>
	  <option > Portugal </option>
	  <option > Qatar </option>
	  <option > Romania </option>
	  <option >Russia </option>
	  <option > Rwanda  </option>
	  <option >Saint Kitts and Nevis  </option>
	  <option >Saint Lucia  </option>
	  <option > Saint Vincent and the Grenadines </option>
	  <option > Samoa </option>
	  <option > San Marino </option>
	  <option > Sao Tome and Principel </option>
	  <option > Saudi Arabia  </option>
	  <option > Senegal  </option>
	  <option > Serbia </option>
	  <option > Seychelles </option>
	  <option > Sierra Leone </option>
	  <option > Singapore </option>
	  <option > Slovakia </option>
	  <option > Slovenia </option>
	  <option > Solomon Islands </option>
	  <option >Somalia  </option>
    <option >South Africa  </option>
	  <option >South Korea  </option>
	  <option > South Sudan </option>
	  <option > Spain </option>
	  <option > Sri Lanka </option>
	  <option >Sudan  </option>
	  <option >Suriname  </option>
	  <option > Sweden </option>
	  <option > Switzerland  </option>
	  <option > Syria </option>
	  <option >Taiwan  </option>
	  <option > Tajikistan </option>
	  <option > Tanzania </option>
	  <option > Thailand </option>
	  <option >Timor-Leste  </option>
	  <option > Togo </option>
	  <option > Tonga </option>
	  <option > Trinidad and Tobago </option>
	  <option > Tunisia </option>
	  <option > Turkey </option>
	  <option >Turkmenistan  </option>
	  <option > Tuvalu </option>
	  <option > Uganda </option>
	  <option > Ukraine </option>
    <option > United Arab Emirates (UAE) </option>
	  <option > United Kingdom (UK) </option>
	  <option > Uruguay </option>
	  <option > Uzbekistan </option>
	  <option > Vanuatu </option>
	  <option > Vatican City (Holy See) </option>
	  <option > Venezuela </option>
	  <option > Vietnam </option>
	  <option > Yemen  </option>
	  <option >   Zambia </option>
	  <option > Zimbabwe </option>
       </Select>
     </FormControl>
      </Grid>
            <Grid item xs={6}>
            <TextField name="notes" onChange={handleChangeData}
                id="outlined-multiline-static" 
                label="Notes"
                 multiline
                 rows={4}
                variant="outlined"
                />
            </Grid>
          </Grid>
          
            
          </form>
        <section className="d-flex justify-content-between">
         <button
            class="btn btn-primary prevbtn"
			onClick={(k) => setKey('legal-address')}>
          <strong>Previous</strong>
         </button>
         <button
           class="btn btn-primary nextbtn"
           onClick={(k) => setKey('fee-details')}>
          <strong>Next</strong>
         </button>
        </section>
		</Tab>
		<Tab eventKey="fee-details" title="Fee Details">
		<form noValidate autoComplete="off">
      <Grid container spacing={3}>
            <Grid item xs={6}>
            <TextField name="authorization_fee" onChange={handleChangeData} id="outlined-basic" label="Authorization Fee" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="capture_fee" onChange={handleChangeData}id="outlined-basic" label="Capture Fee" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="gateway_transaction_fee" onChange={handleChangeData} id="outlined-basic" label="Gateway Transaction Fee" variant="outlined" />
            </Grid>
             
            <Grid item xs={6}>
            <TextField name="chargeback_fee" onChange={handleChangeData} id="outlined-basic" label="Chargeback Fee" variant="outlined" />
            </Grid>
            
            <Grid item xs={6}>
            <TextField name="standardreturn_fee" onChange={handleChangeData} id="outlined-basic" label="Standard Return Fee" variant="outlined" />
         
            </Grid>
            <Grid item xs={6}>
            <TextField name="retrival_request" onChange={handleChangeData} id="outlined-basic" label="Retrival Request  " variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="refunds" onChange={handleChangeData} id="outlined-basic" label="Refunds" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="monthly" onChange={handleChangeData} id="outlined-basic" label="Monthly" variant="outlined" />
            
            </Grid>
            <Grid item xs={6}>
            <TextField name="gateway_monthly" onChange={handleChangeData} id="outlined-basic" label="Gateway Monthly" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="settlement_fee" onChange={handleChangeData} id="outlined-basic" label="Settlement Fee" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="annual" onChange={handleChangeData} id="outlined-basic" label="Annual" variant="outlined" />
            
            </Grid>
            <Grid item xs={6}>
            <TextField name="customer_service" onChange={handleChangeData} id="outlined-basic" label="Customer Service" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="miscellaneous" onChange={handleChangeData}  id="outlined-basic" label="Miscellaneous" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="reserve" onChange={handleChangeData}  id="outlined-basic" label="Reserve" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            
            <TextField name="settling" onChange={handleChangeData} id="outlined-basic" label="Settling " variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="resellers" onChange={handleChangeData} id="outlined-basic" label="Resellers" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="buy_rate" onChange={handleChangeData} id="outlined-basic" label="Buy Rate" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            
            <TextField name="sell_rate" onChange={handleChangeData} id="outlined-basic" label="Sell Rate" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="split" onChange={handleChangeData} id="outlined-basic" label="Split" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="discount" onChange={handleChangeData} id="outlined-basic" label="Discount " variant="outlined" />
            </Grid>
            <Grid item xs={6}>
            <TextField name="setup" onChange={handleChangeData} id="outlined-basic" label="Setup" variant="outlined" />
            </Grid>
            </Grid>
        
            </form>
        <section className="d-flex justify-content-between">
         <button
           class="btn btn-primary prevbtn"
           onClick={(k) => setKey('bank-details')}>
          <strong>Previous</strong>
         </button>
         <button
             class="btn btn-primary nextbtn"
			 onClick={createUser}>
          {getButton()}
         </button>
        </section>
		</Tab>
		</Tabs>
	</div>
		
    </div>
    </div>
    </div>
    </div>
  );
}
export default UserForm;