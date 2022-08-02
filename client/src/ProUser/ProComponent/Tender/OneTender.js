import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FcLike,FcInternal,FcLowPriority } from "react-icons/fc";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function OneTenderCom() {
  return (
    <Paper
      sx={{
        p: 1,
        margin: 'auto',
        maxWidth: 'auto',
        flexGrow: 1,
        backgroundColor: "#fff",
        borderRadius:"12px",
        marginTop:"10px"
      }}
    >
          <Grid item  container direction="column" spacing={0}  >
          <Grid container spacing={2}  >
        <Grid item xs={3} >
          <ButtonBase sx={{ width: "auto", height: "auto" }}>
            <Img style={{borderRadius:"12px"}} alt="complex" src="https://res.cloudinary.com/mera-tender/image/upload/v1657983613/defaultLogo/biharLogo_bqdrr5.jpg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={9} sm container >
          <Grid item xs container direction="column" spacing={1}  >
            <Grid item xs>
            <Typography variant="subtitle2" gutterBottom component="div">
            Road Construction Department 
            </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                 {<FaMapMarkerAlt/>} Araria
                 </Typography>
              <Typography variant="body2" color="text.secondary">
              Name of Work: Construction of HL RCC Bridge under ROB
              </Typography>
            </Grid>   
          </Grid>         
        </Grid>
      </Grid>
                   

          <Grid item xs style={{marginTop:"12px"}}>
          <Grid item xs container  spacing={2}>
          <Grid item xs={3} container direction="column">
          <Typography variant="body2" color="text.secondary">
              Opening
              </Typography>
          <Typography variant="caption" display="block" gutterBottom>
              02/08/2022
              </Typography>
         </Grid>             
          <Grid item xs={3} container direction="column">
          <Typography variant="body2" color="text.secondary">
          Closing 
              </Typography>
          <Typography variant="caption" display="block" gutterBottom>
              02/08/2022
              </Typography>
         </Grid>             
                   
          <Grid item xs={2} >
          <Typography variant="body2" color="text.secondary">
              Amount
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              20,000
              </Typography>
         </Grid>             
          <Grid item container xs={4} >
          <Grid item  xs={1} >
         </Grid>             
          <Grid item  xs={3} >
             <FcLike style={{width:"100%",height:"100%"}}/> 
         </Grid> 
         <Grid item  xs={1} >
         </Grid>            
         <Grid item  xs={3} >
             <FcInternal style={{width:"100%",height:"100%"}}/>
         </Grid>   
         <Grid item  xs={1} >
         </Grid>          
         <Grid item  xs={3} >
            <FcLowPriority style={{width:"100%",height:"100%"}}/>
         </Grid>             

         </Grid>             

         
         </Grid>             
        </Grid>
        </Grid>
   
    </Paper>
  );
}
