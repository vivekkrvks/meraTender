import * as React from 'react';
import CommonPubDash from "../Components/Navigation/PublicAppBarNavBar/CommonPubDash"

import {Grid,Container,TextField,MenuItem,Typography, Box,Tabs,Tab} from '@mui/material/';
import { useState } from 'react';
import { FcHome,FcBusinessman,FcLike } from "react-icons/fc";


export default function FullWidthTabs() {
  const [tabValue, setTabValue]=useState(1)
  const [plan, setPlan]=useState("")
  const [years, setYears]=useState("")
  return (
	<>
	<CommonPubDash compo = {
              <Box sx={{ width: '100%' }} className="mainbg" >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} variant="fullWidth" onChange={(e,v)=>setTabValue(v)} aria-label="tabs">
                  <Tab label="Health" icon={<FcBusinessman style={{fontSize:"1.2rem"}}/>}  />        
                  <Tab label="Insurance" icon={<FcLike style={{fontSize:"1.2rem"}}/>}  />
        
                </Tabs>
              </Box>
              {tabValue===0 ? 
              <div>
                Tab 1
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, amet quidem.
              </div> : 
               <div>
                <Container>
                    <br/>
                    <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                  id="dropdown1"
                  variant="standard" 
                   size="small"
                   fullWidth
                  select
                  label="Select Plane"
                  value={plan}
                  onChange={e=>setPlan(e.target.value)}
                  helperText="Please select Plan"
                >
                <MenuItem value="Premium">Premium </MenuItem>
                <MenuItem value="Gold">Gold </MenuItem>
                <MenuItem value="Silver">Silver </MenuItem>
                </TextField>
                    </Grid>
        
        
                    <Grid item xs={6}>
                        <TextField
                        id="dropdown2"
                        variant="standard" 
                        size="small"
                        fullWidth
                  select
                  label="Select Years"
                  value={years}
                  onChange={(e)=>setYears(e.target.value)}
                  helperText="Please select Years"
                >
                <MenuItem value="05">05 Years </MenuItem>
                <MenuItem value="08">08 Years </MenuItem>
                <MenuItem value="10">10 Years </MenuItem>
                <MenuItem value="15">15 years </MenuItem>
                <MenuItem value="99">Life time </MenuItem>
                </TextField>
                    </Grid>
                </Grid>
        
                <div className='mainCard'>
                    <Grid container spacing={2} className="center">
                        <Grid item xs={4}>
                        <div className="imgBox">
                        </div>
                        </Grid>
                          <Grid item xs={8}>
                            <Typography variant="subtitle2" color="primary">Ultra Saving Plan ~ {`${years} Years`}</Typography>
                            <span style={{display:"flex",flexDirection:"row"}}>
                                <FcHome style={{fontSize:"1.2rem", paddingRight:"10px"}}/>
                            <Typography variant="subtitle2" color="secondary">Delhi, Rajib Chowk</Typography>
                            </span>
                            <p ><b>{`${plan} Plane`}</b> is the masterstock from Amway Pharma, This has been awarded from 3th Best Reliable plan is India. Feel free to ask our expert for more details. </p>
        
                        </Grid>
                    </Grid>
                   
        
                </div>
        
                </Container>
              </div>}
            </Box>
	} />
	</>
   
  );
}





