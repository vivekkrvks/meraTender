import './App.css';
import React, { useState, useEffect,useContext, useRef } from "react";

import {Container,Typography,TextField,Button, Grid} from '@mui/material/';
import { Navigate } from "react-router-dom";
import MySnackbar from "../../src/Components/MySnackbar";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { MainContext } from "../Components/Context/MainContext";
import CheckPage from './ProComponent/Tender/checkForPage';

import Box from "@mui/material/Box";

import Fab from "@mui/material/Fab";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const axios = require("axios")

function App() {
	const { state, dispatch } = useContext(MainContext);
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
    handleOpen();
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
    handleClose()
  }


  if(redirect){
    return <Navigate to="/LoginOtp"/>
  }

  return (
    <div tyle={{ flex: 1,
      justifyContent: 'center',
      alignItems: 'center',}}>
      <CheckPage
      from="Login"
      />
      <a href="https://wa.me/6202971746?text=I'm%20interested%20in%20your%20MeraTender%20App%20Purchase">
     
     <Fab
        color="success"
        aria-label="add"
        
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <WhatsAppIcon fontSize="large" />
      </Fab>
      </a>

     <Container maxWidth="sm" className="bg1" s>
     <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
 
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
        {`Don’t worry ! Your Mobile No is safe with us. Please enter the phone number we will send the OTP in this phone number.`}
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
      <img style={{marginTop:"40px",widht:"full"}} src="https://res.cloudinary.com/mera-tender/image/upload/v1661768619/defaultImage/front_photo_eb62my.jpg" alt="Girl in a jacket" width="100%" height="auto" />
      </Grid>
    </Grid>
         
      
		<MySnackbar ref={snackRef} />
      
     </Container>
    </div>
  );
}

export default App;
