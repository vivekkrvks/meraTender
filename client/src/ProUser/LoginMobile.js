import './App.css';
import { useState } from 'react';
import {Container,Typography,TextField,Button, Grid} from '@mui/material/';
import { Navigate } from "react-router-dom";

function App() {
  const [mobileNo, setMobileNo] = useState("")
  const [redirect, setRedirect] = useState(false)
  const handleChangeMobileNo = (e) => {
    if(e.length<=10){
      setMobileNo(e)
    }
  }

  const handlemobileNo=()=>{
    if(mobileNo.length === 10){
      console.log(mobileNo)
      localStorage.setItem('mobileNo', mobileNo);
      setRedirect(true)
    }else{
      alert("mobileNo No is not Valid")
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
        Enter your mobileNo No below👇👇
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
     <Button variant="contained" fullWidth style={{borderRadius:10}} onClick={handlemobileNo}>Continue</Button>
      </Grid>
      <Grid item xs={12}>
      <img src="https://svgshare.com/i/j_p.svg" alt="Girl in a jacket" width="100%" height="auto" m/>
      </Grid>
    </Grid>
         
      
      
     </Container>
    </div>
  );
}

export default App;
