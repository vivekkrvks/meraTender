import React, {  useState,useContext, useEffect } from "react";
import { MainContext } from "../../../Components/Context/MainContext";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

const tiers = [

    {
      title: 'Pro',
      subheader: 'Most popular',
      price: '99',
      description: [
        '1-1 Call With Our Expert',
        'NIT and Other Document',
        'All Information You Need',
        'Priority WhatsApp support',
      ],
      buttonText: 'Pay Now',
      buttonVariant: 'contained',
    },
  
  ];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TenderInfoPricingCom({tenderId}) {
  const [open, setOpen] = React.useState(false);
//   const [tenderId, setTenderId] = useState(tenderId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [redirect, setRedirect] = useState(false) 
  const { state, dispatch } = useContext(MainContext);

  const handlePay = () => {
    if (state.isAuthenticated) {      

        axios
          .post("/api/v1/forPublicWeb/tenderInfoPaytm/pay", { tenderId})
          .then((res) => {
           console.log("myData" + res.data)

            if(res.data){
              window.location.href = res.data;

            }
          })
          .catch((err) => console.log(err));
      
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setRedirect(true)
  }
 if(redirect){
  return <Navigate to="/"/>
}

  return (
    <div>
 <Button 
    style={{width:"99%",borderRadius: "7px", marginTop:"1px", marginDown:"6px" }}
    variant="contained" 
    color="secondary"
    onClick={handleClickOpen}
    // onClick={()=>handlePay()}
    // endIcon={<SendIcon />}
    >
        अधिक जानकारी के लिए click करे।
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Get Call Back
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        {/* it start here */}
        <React.Fragment>
          <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
          <CssBaseline />
    
          {/* Hero unit */}
          <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 2, pb: 6 }}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Get Call Back
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" component="p">
           Get More on the Tender you just Clicked
            </Typography>
          </Container>
          {/* End hero unit */}
          <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
              {tiers.map((tier) => (
                // Enterprise card is full width at sm breakpoint
                <Grid
                  item
                  key={tier.title}
                  xs={12}
                  sm={tier.title === 'Enterprise' ? 12 : 6}
                  md={4}
                >
                  <Card>
                    <CardHeader
                      title={tier.title}
                      subheader={tier.subheader}
                      titleTypographyProps={{ align: 'center' }}
                      action={tier.title === 'Pro' ? <StarIcon /> : null}
                      subheaderTypographyProps={{
                        align: 'center',
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'baseline',
                          mb: 2,
                        }}
                      >
                        <Typography component="h2" variant="h3" color="text.primary">
                        ₹{tier.price}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          {/* /All Information t */}
                        </Typography>
                      </Box>
                      <ul>
                        {tier.description.map((line) => (
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={line}
                          >
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth 
                      variant={tier.buttonVariant}
                      onClick={handlePay}
                      >
                        {tier.buttonText}
                        
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
    
        </React.Fragment>
        {/* body end here */}
      </Dialog>
    </div>
  );
}
