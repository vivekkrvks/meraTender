import './App.css';
import React, { useState, useEffect, useRef } from "react";

import {Container,Typography,TextField,Button, Grid} from '@mui/material/';
import { Navigate } from "react-router-dom";
import MySnackbar from "../../src/Components/MySnackbar";

const axios = require("axios")

function App() {
	const snackRef = useRef();

  const [mobileNo, setMobileNo] = useState("")
  const [redirect, setRedirect] = useState(false)
  const handleChangeMobileNo = (e) => {
    if(e.length<=10){
      setMobileNo(e)
    }
  }
  const [open, setOpen] = useState(false);
	const handleClose = () => {
	  setOpen(false);
	};
	const handleOpen = () => {
	  setOpen(true);
	};

  const handleSubmit= async(e)=>{
    if(mobileNo.length === 10){
      e.preventDefault();
      handleOpen();
      let newData = { mobileNo };
      await axios
        .post(`/api/v1/auth/otpLogin/sendOtp`, newData)
        .then((res) => {
          snackRef.current.handleSnack(res.data);
          handleClose()
          if(res.data.variant==="success"){
            localStorage.setItem('mobileNo', mobileNo);
            setRedirect(true)
          }
        })
        .catch((err) => console.log(err));

 
    }else{
      alert("Mobile No is not Valid")
    }
  }
  if(redirect){
    return <Navigate to="/LoginOtp"/>
  }
  return (
    <div >
     <Container maxWidth="sm" className="bg1">
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" style={{marginTop:"3rem",fontWeight: 700}} component="div">
        Login or Register
      </Typography>
       <Typography variant="h6" style={{fontWeight: 700}} gutterBottom component="div">
        Enter your Mobile No below👇👇
      </Typography>
      </Grid>
      <Grid item xs={12}>
      <Typography variant="caption" display="block" gutterBottom>
        {`Don’t worry ! Your mobileNo No is save with us. Please enter the phone number we will send the OTP in this phone number.`}
      </Typography>
      </Grid>
      <Grid item xs={12}>
     <TextField 
		inputProps={{ maxLength: "10" }}
     id="outlined-basic" 
     value={mobileNo} 
     onChange={e=>handleChangeMobileNo(e.target.value)} label="Enter the phone Number" type="number" placeholder='Enter the phone Number' fullWidth variant="outlined" />
      </Grid>
      <Grid item xs={12}>
     <Button variant="contained" fullWidth style={{borderRadius:10}} onClick={handleSubmit}>Continue</Button>
      </Grid>
      <Grid item xs={12}>
      <img src="https://svgshare.com/i/j_p.svg" alt="Girl in a jacket" width="100%" height="auto" m/>
      </Grid>
    </Grid>
         
      
		<MySnackbar ref={snackRef} />
      
     </Container>
    </div>
  );
}

export default App;
