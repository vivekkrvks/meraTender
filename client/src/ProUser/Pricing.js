import './App.css';
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import {Container,Typography,Button, Grid} from '@mui/material/';

function Pricing() {
    const [redirect, setRedirect] = useState(false)
    const handleSubmit = () => {
      setRedirect(true)
    }
   if(redirect){
    return <Navigate to="/MainApp"/>
  }
  return (
    <div className='pricingBg' >
     <Container maxWidth="sm" style={{minHeight:"100vh"}}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Button onClick={()=>handleSubmit()} variant="contained" color='secondary' fullWidth style={{marginTop:"2rem", borderRadius:30}}>Best Value</Button>
      </Grid>
      <Grid item xs={12} style={{marginLeft:"20px",marginRight:"20px"}}>  
       {/* position: absolute;
  top: 50%;
  left: 50%; */}
      <Button onClick={()=>handleSubmit()} variant="contained" fullWidth style={{ marginTop:"0.2rem", background:"#0000FF", borderRadius:30}}>Recommended</Button>
      </Grid>
      <Grid item xs={12}>
       <Typography variant="h5" textAlign="center" color="textSecondary" gutterBottom component="div">
       Spend your time winning Tender, not finding it.
        </Typography>
      </Grid>
       <Grid item xs={12} style={{alignItems:"center"}}>
        <div className="card" onClick={()=>handleSubmit()}>
          <span>For 1 Year</span>
             <p><s> ₹ 9999.00 </s>  </p> 
          <h6> ₹ 2999.00  </h6>         
      <button > Subscribe Now</button>

        </div>
       </Grid>

       <Grid item xs={12}>
        <div className="benefit">
          <br/>
          <center>
          <Typography variant='subtitle2' color="primary"> ⭐️ <b>Benifits of Business Plan</b> ⭐️</Typography>
          <ul>
            <li>Says it all! Tension-free. Unlimited Tender downloads.</li>
            <li>Daily Updated Tender.c</li>
            <li>No Need Waste your time on Newspaper or Magazine.</li>
            <li>Any class of Contractor can subscribe & use it easily.</li>
            <li>{`Easy to use & User Friendly App Interface.`}</li>
            <li>{`After Subscription you will never miss any tender`}</li>
            <li>{`Filter tender with location or Department`}</li>
          </ul>
          </center>
        </div>
       </Grid>
       <Grid item xs={12}>
        <Typography variant='subtitle2' color="secondary"> *Terms & Conditions Applied</Typography>
       </Grid>
     
  
    </Grid>
         
      
      
     </Container>
    </div>
  );
}

export default Pricing;
