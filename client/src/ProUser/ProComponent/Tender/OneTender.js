import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { SiGooglemaps } from "react-icons/si";
import { FcLike,FcInternal,FcLowPriority } from "react-icons/fc";
import { FiBookmark } from "react-icons/fi";
import { FcBookmark } from "react-icons/fc";
import { GrDocumentPdf } from "react-icons/gr";
import { VscFilePdf } from "react-icons/vsc";
import { Avatar, Badge } from '@mui/material';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function OneTenderCom(props) {
  
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
          <StyledBadge
          invisible={!props.showLiveOnPhoto}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
            {/* <Img style={{borderRadius:"12px"}} alt="complex" src={props.departmentLogo} /> */}

        <Avatar alt="Remy Sharp"    sx={{ width: 70, height: 70 }} md={{ width: 180, height: 180 }} src={props.departmentLogo} />
      </StyledBadge>
          </ButtonBase>
        </Grid>
        <Grid item xs={9} sm container >
          <Grid item xs container direction="column" spacing={1}  >
            <Grid item xs>
            <Typography style={{color: "#447eed"}} variant="subtitle2" gutterBottom component="div">
           { props.tenderTitle }
            </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                 {<SiGooglemaps/>} {props.district?.districtName}
                 </Typography>
              <Typography variant="body2" color="text.secondary">
              {props.shortDescription}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              <b> Tender Amount : ₹ {props.tenderAmount}</b>
                 </Typography>
            </Grid>   
          </Grid>         
        </Grid>
      </Grid>
                   

          <Grid item xs container style={{ marginTop:"1px"}}  spacing={1}>
          <Grid item xs={3} container style={{display:"flex", justifyContent:"space-between"}} direction="column">
          <Typography variant="caption" style={{fontSize:"x-small"}} display="block" gutterBottom>
              Opening Date
              </Typography>
              <Typography variant="button" style={{fontSize:"small",color:"green"}} display="block" gutterBottom>
              {props.openingDate}
              </Typography>
         </Grid>             
          <Grid item xs={3} container style={{display:"flex", justifyContent:"space-between"}} direction="column">
          <Typography variant="caption" style={{fontSize:"x-small"}} display="block" gutterBottom>
          Closing Date
              </Typography>
              <Typography variant="button" style={{fontSize:"small",color:"red"}} display="block" gutterBottom>
             {props.closingDate}
              </Typography>
         </Grid>             
                   
          {/* <Grid item xs={2} >
          <Typography variant="body2" color="text.secondary">
              Amount
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {props.tenderAmount}
              </Typography>
         </Grid>              */}
          <Grid item container xs={6} >
          <Grid item  xs={1} >
         </Grid>             
          <Grid 
          onClick={() => (
            props.saveThisTender(props.id,props.district,props.department,props.from,props.position))}
        
          item  xs={3} style={{cursor:"pointer"}} >
          {props.isSaved? <FcBookmark style={{width:"100%",height:"100%"}}/> : <FiBookmark style={{width:"100%",height:"100%"}}/> }  
         </Grid> 
         <Grid item  xs={1} >
         </Grid>      
         {/* borderStyle:"outset"       */}
         {(props.file1Url)&&(<Grid item style={{cursor:"pointer"}} xs={3} >
          <a href={props.file1Url}  >
             <GrDocumentPdf style={{width:"100%",height:"100%"}}/></a>
         </Grid>   )}
         <Grid item  xs={1} >
         </Grid>          
        {(props.file2Url)&&( <Grid item style={{cursor:"pointer"}} xs={3} >
          <a href={props.file2Url} >
            <VscFilePdf style={{width:"100%",height:"100%"}}/></a>
         </Grid>  )}           

         </Grid>             

         
         </Grid>             
        </Grid>
   
    </Paper>
  );
}
