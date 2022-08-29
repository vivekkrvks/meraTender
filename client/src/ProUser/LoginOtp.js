import './App.css';
import {Container,Typography,Button, Grid, TextField} from '@mui/material/';
import { Navigate } from "react-router-dom";
import React, { useState, useRef,useContext, useEffect } from 'react'
import MySnackbar from "../../src/Components/MySnackbar";
import { LOGIN_USER } from "../Components/Context/types";
import { MainContext } from "../Components/Context/MainContext";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const axios = require("axios")

function Otp() {
	const snackRef = useRef();

    const mobileNo = localStorage.getItem('mobileNo');
    const [otp, setOtp]= useState("")
    const [redirect, setRedirect] = useState(false)

    const { state, dispatch } = useContext(MainContext);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };

    const handleChangeOtp = (e) => {
      if(e.length<=4){
        setOtp(e)
      }
    }
  
    const handleSubmit = async(e) => {
      if(otp.length == 4){
        handleOpen();
        let newData = { mobileNo,otp };
        await axios
          .post(`/api/v1/auth/otpLogin/check`, newData)
          .then((res) => {
            snackRef.current.handleSnack(res.data);
            handleClose()
            if(res.data.variant==="success"){
              dispatch({ type : LOGIN_USER, payload : res.data});
              setRedirect(true)
            }
          })
          .catch((err) => console.log(err));
      } else {
        alert("Enter a Valid otp")
      }
      handleClose()
    }

    if(redirect){
    return <Navigate to="/pricing"/>
  }



  return (
    <div >
     <Container maxWidth="sm" className="bg2">
     <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <Grid container spacing={2} >
 
      <Grid item xs={12}>
       <Typography variant="button" display="block" textAlign="center" style={{marginTop:"3rem",fontWeight: 700}} gutterBottom>
        OTP VERIFICATION
      </Typography>
      </Grid>
      <Grid item xs={12}>
         <Typography variant="caption" textAlign="center" gutterBottom component="div">
      Enter the OTP sent to - +91- {mobileNo}
      </Typography>
      </Grid>
      
      <Grid item xs={12}>
        <Grid container>
        <Grid item xs={12}>
         <TextField id="outlined-basic" 
		      inputProps={{ maxLength: "4" }}
         value={otp} 
         onChange={e=>handleChangeOtp(e.target.value)} 
         label="Enter the OTP" 
         type="number" 
         placeholder='Enter the phone Number' 
         fullWidth 
         variant="outlined" 
         />
        </Grid>
        </Grid>
      

      </Grid>
      {/* <Grid item xs={12}>
         <Typography variant="subtitle1" textAlign="center" gutterBottom component="div">
             Sec

      </Typography> */}
      {/* <h2>{timer}</h2>
            <button onClick={() =>( clearTimer(getDeadTime()))}>Reset</button> */}
      {/* </Grid>   */}
      {/* <Grid item xs={12}>
         <Typography variant="subtitle1" color="textSecondary" textAlign="center" gutterBottom component="div">
          {`Don’t receive code ? `} <b>{`Re-send`}</b>
      </Typography> */}
     
      {/* </Grid> */}
      <Grid item xs={12}>
     <Button variant="contained" onClick={() => handleSubmit()}  fullWidth style={{borderRadius:10}}>Submit</Button>
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

export default Otp;
