import React, { Fragment, useState, useEffect, useRef } from "react";

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { SiGooglemaps } from "react-icons/si";
import { Avatar, Badge, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function MultiShopCom(props) {
  
  const [bLink,setbLink] = useState(props.businessLink)
//   // const [tabValue, setTabValue]=useState(0)
// console.log(props)
// console.log(bLink)
  return (
    <div>
    <Paper
    elevation={12}
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
          <Grid item xs={10} >
          <Grid item  container direction="column" spacing={0}  >
          <Grid container spacing={2}  >
        <Grid item xs={3} >
          <ButtonBase sx={{ width: "auto", height: "auto" }}>
          <Badge
             overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  badgeContent={
    <SmallAvatar alt="Remy Sharp" src="https://www.pngitem.com/pimgs/m/302-3024199_instagram-verified-symbol-png-instagram-verified-logo-png.png" />
  }
>
<Avatar alt="Remy Sharp"    sx={{ width: 70, height: 70 }} md={{ width: 180, height: 180 }} src={"https://previews.123rf.com/images/danilzorin/danilzorin1712/danilzorin171200069/106278513-tienda-online-logo-de-la-tienda-online-logotipo-para-empresas-ilustraci%C3%B3n-vectorial-aislada.jpg"} />
</Badge>
   
          </ButtonBase>
        </Grid>
        <Grid item xs={9} sm container >
          <Grid item xs container direction="column" spacing={1}  >
            <Grid item xs>
            <Typography style={{color: "#447eed"}} variant="subtitle2" gutterBottom component="div">
            {props.partnerName }✔️
            </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                 {<SiGooglemaps/>} {props.districtName}
                 </Typography>
              <Typography variant="body2" color="text.secondary">
              {props.businessTypeName}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              <b> WhatsApp📱 : ₹ {props.whatsAppNo}</b>
                 </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              <b> Call📞 : ₹ {props.mobileNo}</b>
                 </Typography>
            </Grid>   

          </Grid>         
        </Grid>
      </Grid>               
      </Grid>         
      </Grid>    
      {/* <Grid item xs={2} >
      <Grid item  container direction="column" spacing={0}  >
          <Grid container spacing={2}  >
        <Grid item xs={6} >
        <Button variant="outlined"  startIcon={<DeleteIcon />}>
        Delete
      </Button>
        </Grid>     
        <Grid item xs={6} >
        <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
        </Grid>     
        </Grid>     
        </Grid>     
        </Grid>      */}
      </Grid>         
    </Paper>
    <Button></Button>
    </div>
  );
}
