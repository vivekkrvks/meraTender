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
import PdfDialog from "./PdfViewer"

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
          <PdfDialog 
          fileUrl ={props.file1Url}
          fileIcon= {<svg style={{width:"110%",height:"110%"}}version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="500.000000pt" height="500.000000pt" viewBox="0 0 500.000000 500.000000"
          preserveAspectRatio="xMidYMid meet">
         
         <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
         fill="#000000" stroke="none">
         <path d="M1465 4256 c-181 -45 -333 -201 -379 -387 -9 -36 -16 -68 -16 -72 0
         -4 47 -7 103 -7 l104 0 12 43 c29 99 118 190 215 220 31 9 266 12 996 12 l955
         0 56 -26 c69 -33 127 -89 160 -155 l24 -49 5 -600 5 -600 103 -3 102 -3 0 588
         c0 489 -3 599 -15 652 -44 183 -195 338 -380 387 -70 19 -1974 19 -2050 0z"/>
         <path d="M772 3636 l-37 -34 -3 -559 c-2 -546 -2 -559 18 -591 40 -65 -5 -62
         1025 -62 1016 0 978 -2 1023 55 22 28 22 29 22 582 0 609 2 590 -60 627 -26
         14 -117 16 -989 16 l-961 0 -38 -34z m511 -217 c94 -26 150 -117 151 -241 0
         -66 -5 -85 -30 -135 -41 -80 -82 -102 -219 -116 l-105 -11 0 -143 0 -143 -90
         0 -90 0 0 400 0 400 173 0 c94 0 189 -5 210 -11z m584 -4 c69 -20 112 -52 151
         -109 47 -71 65 -143 65 -266 1 -197 -62 -328 -183 -384 -40 -18 -65 -20 -212
         -21 -92 0 -168 3 -168 8 0 4 0 183 0 397 l0 390 148 0 c102 0 164 -5 199 -15z
         m813 -55 l0 -70 -150 0 -150 0 0 -100 0 -100 115 0 115 0 0 -70 0 -70 -115 0
         -115 0 0 -160 0 -161 -92 3 c-51 2 -92 6 -90 11 1 4 2 183 2 397 l0 390 240 0
         240 0 0 -70z"/>
         <path d="M1080 3186 l0 -116 43 0 c23 0 52 3 65 6 53 15 72 139 29 190 -19 22
         -34 28 -80 32 l-57 4 0 -116z"/>
         <path d="M1700 3029 l0 -261 48 7 c26 3 58 13 70 22 39 24 65 98 70 195 10
         208 -36 298 -154 298 l-34 0 0 -261z"/>
         <path d="M3158 2454 c-15 -8 -32 -23 -38 -34 -6 -12 -10 -195 -10 -514 l0
         -496 -181 0 c-107 0 -179 -4 -177 -9 5 -15 822 -911 830 -911 4 0 144 150 310
         332 167 183 354 389 417 458 l114 125 -181 3 -182 2 0 490 c0 344 -3 496 -11
         514 -25 54 -42 56 -471 56 -327 -1 -398 -3 -420 -16z"/>
         <path d="M1070 1757 c0 -472 2 -520 19 -588 50 -197 222 -356 419 -388 46 -8
         304 -11 824 -9 l757 3 -90 100 -90 100 -697 5 -697 5 -57 28 c-62 30 -115 83
         -150 149 l-23 43 -3 533 -3 532 -104 0 -105 0 0 -513z"/>
         </g>
         </svg>}
          fileName={"PDF"}
          />
       
         </Grid>   )}
         <Grid item  xs={1} >
         </Grid>          
        {(props.file2Url)&&( <Grid item style={{cursor:"pointer"}} xs={3} >
        <PdfDialog 
          fileUrl ={props.file2Url}
          fileIcon= {<svg style={{width:"110%",height:"110%"}} version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="494.000000pt" height="505.000000pt" viewBox="0 0 494.000000 505.000000"
          preserveAspectRatio="xMidYMid meet">
         
         <g transform="translate(0.000000,505.000000) scale(0.100000,-0.100000)"
         fill="#000000" stroke="none">
         <path d="M1087 4624 c-94 -22 -167 -64 -238 -134 -103 -102 -149 -213 -149
         -362 l0 -78 114 0 114 0 4 83 c2 52 10 95 22 119 24 49 79 102 136 130 l45 23
         1205 0 1205 0 45 -21 c89 -42 143 -116 158 -215 l7 -54 110 0 110 0 3 38 c12
         150 -112 348 -267 427 -123 62 -81 60 -1381 59 -980 -1 -1195 -3 -1243 -15z"/>
         <path d="M1134 4094 c-50 -24 -86 -69 -100 -124 -7 -28 -11 -56 -9 -63 2 -7 6
         -24 9 -39 3 -14 18 -41 32 -58 82 -96 233 -91 301 11 23 35 28 53 28 104 0 51
         -5 70 -28 104 -48 72 -157 103 -233 65z"/>
         <path d="M607 3973 c-19 -23 -23 -41 -14 -75 11 -40 59 -51 209 -47 143 4 168
         15 168 74 0 59 -18 65 -192 65 -135 0 -157 -2 -171 -17z"/>
         <path d="M1539 3967 c-18 -12 -39 -34 -46 -47 -10 -19 -13 -151 -13 -556 0
         -524 0 -532 21 -558 47 -60 -40 -56 1374 -56 1405 0 1332 -3 1385 55 l25 27 0
         533 c0 524 0 534 -21 562 -11 15 -36 36 -55 45 -32 17 -116 18 -1335 18
         l-1301 0 -34 -23z m520 -260 c18 -28 86 -128 150 -220 l116 -169 5 219 5 218
         128 3 127 3 0 -426 0 -425 -130 0 -130 0 -54 83 c-30 45 -97 145 -150 221
         l-96 139 0 -221 0 -222 -130 0 -130 0 0 418 c0 230 3 422 7 425 3 4 61 7 127
         7 l121 0 34 -53z m979 -375 l2 -423 -137 3 -138 3 -3 399 c-2 220 -1 410 3
         423 5 23 6 24 138 21 l132 -3 3 -423z m922 328 c0 -73 -3 -100 -12 -101 -7 -1
         -66 -1 -130 0 l-118 2 -2 -323 -3 -323 -137 -3 -138 -3 0 321 0 320 -53 0
         c-30 0 -88 3 -130 6 l-77 7 0 98 0 99 400 0 400 0 0 -100z"/>
         <path d="M700 3660 l0 -130 115 0 115 0 0 130 0 130 -115 0 -115 0 0 -130z"/>
         <path d="M1129 3563 c-69 -35 -99 -84 -99 -162 0 -106 78 -184 184 -184 81 0
         139 40 171 115 41 99 -18 218 -123 248 -55 15 -73 13 -133 -17z"/>
         <path d="M611 3452 c-31 -24 -31 -79 -1 -104 19 -16 42 -18 171 -18 136 0 151
         2 169 20 11 11 20 33 20 50 0 17 -9 39 -20 50 -18 18 -33 20 -169 20 -127 0
         -152 -3 -170 -18z"/>
         <path d="M700 3141 l0 -130 43 -6 c23 -3 74 -5 112 -3 l70 3 3 133 3 132 -116
         0 -115 0 0 -129z"/>
         <path d="M1140 3049 c-33 -14 -78 -57 -97 -94 -20 -37 -19 -124 1 -163 20 -39
         67 -77 112 -92 125 -41 256 63 241 190 -13 105 -71 162 -171 167 -33 2 -72 -2
         -86 -8z"/>
         <path d="M624 2939 c-27 -14 -46 -53 -37 -76 18 -51 27 -53 193 -53 174 0 190
         5 190 67 0 58 -25 68 -184 70 -85 2 -149 -2 -162 -8z"/>
         <path d="M700 2616 l0 -136 115 0 116 0 -3 132 -3 132 -112 4 -113 4 0 -136z"/>
         <path d="M3750 2440 l0 -180 115 0 115 0 0 180 0 180 -115 0 -115 0 0 -180z"/>
         <path d="M1132 2519 c-95 -47 -133 -163 -84 -255 16 -31 79 -83 108 -90 14 -4
         49 -4 79 -2 124 10 199 139 146 253 -48 103 -151 142 -249 94z"/>
         <path d="M608 2403 c-23 -28 -28 -51 -17 -77 18 -38 51 -46 190 -46 160 0 189
         11 189 73 0 15 -9 36 -20 47 -18 18 -33 20 -173 20 -134 0 -156 -2 -169 -17z"/>
         <path d="M700 2090 l0 -130 115 0 115 0 0 130 0 130 -115 0 -115 0 0 -130z"/>
         <path d="M3208 2124 c-16 -8 -29 -16 -30 -17 -1 -1 -5 -225 -8 -497 l-5 -495
         -168 -3 c-95 -1 -167 -6 -165 -12 2 -4 69 -80 149 -167 80 -87 199 -216 264
         -288 64 -71 156 -173 204 -225 48 -52 107 -116 130 -142 24 -27 47 -48 51 -48
         6 0 116 119 369 400 184 204 284 313 358 391 40 41 73 78 73 82 0 4 -76 7
         -169 7 l-168 0 -7 493 -7 492 -25 23 -25 22 -397 0 c-332 -1 -401 -3 -424 -16z"/>
         <path d="M1172 2010 c-47 -11 -98 -49 -123 -93 -31 -55 -24 -150 14 -200 32
         -42 100 -77 148 -77 48 0 129 43 156 83 93 137 -34 324 -195 287z"/>
         <path d="M624 1890 c-26 -10 -44 -57 -33 -87 13 -37 41 -43 193 -43 133 0 148
         2 166 20 29 29 26 74 -6 99 -24 19 -40 21 -163 20 -75 0 -146 -4 -157 -9z"/>
         <path d="M700 1565 l0 -135 115 0 115 0 0 135 0 135 -115 0 -115 0 0 -135z"/>
         <path d="M1140 1474 c-76 -33 -110 -86 -110 -171 0 -102 67 -174 169 -181 96
         -7 168 43 192 131 40 151 -109 283 -251 221z"/>
         <path d="M605 1350 c-23 -25 -22 -67 1 -91 17 -17 37 -19 172 -20 134 -2 155
         0 172 16 24 22 26 62 4 93 -15 21 -21 22 -173 22 -144 0 -159 -2 -176 -20z"/>
         <path d="M700 1092 c0 -142 53 -265 156 -361 34 -32 86 -70 116 -85 120 -58
         84 -56 1166 -56 595 0 992 4 990 9 -1 5 -46 57 -98 115 l-95 105 -885 1 c-570
         0 -898 4 -922 10 -58 17 -130 71 -162 123 -25 41 -30 61 -34 133 l-5 84 -113
         0 -114 0 0 -78z"/>
         </g>
         </svg> }
          fileName={"NIT"}
          File
          />
         
         </Grid>  )}           

         </Grid>             

         
         </Grid>             
        </Grid>
   
    </Paper>
  );
}
