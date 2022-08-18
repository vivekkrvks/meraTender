import './App.css';
import React, {  useState,useContext, useEffect } from "react";
import axios from "axios";
import { MainContext } from "../Components/Context/MainContext";
import { makeStyles } from '@mui/styles';
import { Link, Navigate } from "react-router-dom";
import {Container,Typography,Button, Grid, ListItem, Tooltip, ListItemText, Backdrop, CircularProgress} from '@mui/material/';

function Pricing() {
    const [priceId, setPriceId] = useState()
    const [period, setPeriod] = useState()
    const [mrp, setMrp] = useState()
    const [sellingPrice, setSellingPrice] = useState()
    const { state } = useContext(MainContext);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const setPricing = async (pri) => {
      setPriceId(pri._id)
      setPeriod(pri.period)
      setMrp(pri.mrp)
      setSellingPrice(pri.sellingPrice)
    }
  	useEffect(() => {
      
      getPricing("");
    }, []);

    const getPricing = async() => {
      handleOpen()
      await axios
              .get(`/api/v1/addition/price/allprice`)
              .then((res) => (setPricing(res.data[0]),console.log(res.data)))
              .catch(err => console.log(err))
              handleClose()
  }

    const [redirect, setRedirect] = useState(false) 
    const handlePay = () => {
      if (state.isAuthenticated) {

        

          axios
            .post("/api/v1/forPublicWeb/paytm/pay", { priceId})
            .then((res) => {
             console.log("myData" + res.data)

              if(res.data){
                window.location.href = res.data;

              }
            })
            .catch((err) => console.log(err));
        
      } else {
        console.log("this else called")

        handleSubmit();
      }
    };
     
    const handleSubmit = () => {
      setRedirect(true)
    }
   if(redirect){
    return <Navigate to="/MainApp"/>
  }
  return (
    <div className='pricingBg' >
     <Container maxWidth="sm" style={{minHeight:"100vh"}}>
     <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Button onClick={()=>handlePay()} variant="contained" color='secondary' fullWidth style={{marginTop:"2rem", borderRadius:30}}>Best Value</Button>
      </Grid>
      <Grid item xs={12} style={{marginLeft:"20px",marginRight:"20px"}}>  
       {/* position: absolute;
  top: 50%;
  left: 50%; */}
      <Button onClick={()=>handlePay()} variant="contained" fullWidth style={{ marginTop:"0.2rem", background:"#0000FF", borderRadius:30}}>Recommended</Button>
      </Grid>
      <Grid item xs={12}>
       <Typography variant="h5" textAlign="center" color="textSecondary" gutterBottom component="div">
       Spend your time winning Tender, not finding it.
        </Typography>
      </Grid>
       <Grid item xs={12} style={{alignItems:"center"}}>
        <div className="card" onClick={()=>handlePay()}>
          <span>For {period}</span>
             <p><s> ₹ {mrp}.00 </s>  </p> 
          <h6> ₹ {sellingPrice}.00  </h6>         
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
            <li>Daily Updated Tender</li>
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
        <div >
        {listData1.map((l, i) => (
             <Link href={l.link} to={l.link} key={l.link} color="inherit" underline="none">
                  <ListItem button >
               
              <ListItemText style={{color:"black"}} primary={l.text} />
            </ListItem>
          </Link>
                 
          ))}
        </div>
       </Grid>
       <Grid item xs={12}>
        <Typography variant='subtitle2' color="secondary"> Managed By <b>OM PRAKASH</b></Typography>
       </Grid>
     
  
    </Grid>
         
      
      
     </Container>
    </div>
  );
}

export default Pricing;

const listData1 = [
	{ text: "About Us", link: "/about", admin:true,supervisor:true,fieldPartner:true  },
  { text: "Privacy Policy", link: "/PrivacyPolicy",admin:true },
  { text: "Term & Condition", link: "/TermAndCondition", admin:true },
  { text: "Contact Us", link: "/ProContact", admin:true },
  { text: "Pricing", link: "/PricingContent",admin:true },
  { text: "Refund Policy", link: "/RefundPolicy", admin:true },
];