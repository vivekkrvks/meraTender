import './App.css';
import {Container,Typography,Button, Grid, TextField} from '@mui/material/';
import { useState } from 'react';
import { Navigate } from "react-router-dom";

function Otp() {
    const mobile = localStorage.getItem('mobile');
    const [otp, setOtp]= useState("")
    const [redirect, setRedirect] = useState(false)
    const handleChangeOtp = (e) => {
      if(e.length<=4){
        setOtp(e)
      }
    }

    const handleSubmit = () => {
      if(otp.length == 4){
        setRedirect(true)
      } else {
        alert("Enter a Valid otp")
      }

    }

    if(redirect){
    return <Navigate to="/pricing"/>
  }
  return (
    <div >
     <Container maxWidth="sm" className="bg2">
    <Grid container spacing={2} >
 
      <Grid item xs={12}>
       <Typography variant="button" display="block" textAlign="center" style={{marginTop:"3rem",fontWeight: 700}} gutterBottom>
        OTP VERIFICATION
      </Typography>
      </Grid>
      <Grid item xs={12}>
         <Typography variant="caption" textAlign="center" gutterBottom component="div">
      Enter the OTP sent to - +91- {mobile}
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
      <Grid item xs={12}>
         <Typography variant="subtitle1" textAlign="center" gutterBottom component="div">
            00:120 Sec
      </Typography>
      </Grid>  
      <Grid item xs={12}>
         <Typography variant="subtitle1" color="textSecondary" textAlign="center" gutterBottom component="div">
          {`Don’t receive code ? `} <b>{`Re-send`}</b>
      </Typography>
     
      </Grid>
      <Grid item xs={12}>
     <Button variant="contained" onClick={() => handleSubmit()}  fullWidth style={{borderRadius:10}}>Submit</Button>
      </Grid>
      <Grid item xs={12}>
      <img src="https://svgshare.com/i/jb4.svg" alt="Girl in a jacket" width="100%" height="auto" m/>
      </Grid>
  
    </Grid>
         
      
      
     </Container>
    </div>
  );
}

export default Otp;
