import React, { Fragment, useState, useEffect, useRef } from "react";
import MySnackbar from "../../Components/MySnackbar";
import CommonPubDash from "../../Components/Navigation/PublicAppBarNavBar/CommonPubDash"

import {Grid,Container,TextField,MenuItem,Typography, Box,Tabs,Tab, Autocomplete, Backdrop, CircularProgress} from '@mui/material/';
import { FcHome,FcBusinessman,FcLike } from "react-icons/fc";
import OneTenderCom from './../ProComponent/Tender/OneTender';
import axios from "axios";
import { FcBookmark } from "react-icons/fc";
import CheckPage from "./../ProComponent/Tender/checkForPage";
import InfiniteScroll from 'react-infinite-scroller';
import MultiShopCom from "./Component/multiBusiness";

export default function FullWidthTabs() {
  const [tabValue, setTabValue]=useState(0)
  const [businessType, setBusinessType]=useState({"businessTypeName":"","businessTypeLink":""})
  const [allBusinessType, setAllBusinessType]=useState([])
  const [district, setDistrict]=useState({"districtName":"","districtLink":""})
  const [allDistrict, setAllDistrict]=useState([])
	const snackRef = useRef();
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const handleClose = () => {
	  setOpen(false);
	};
	const handleOpen = () => {
	  setOpen(true);
	};

  useEffect(() => {
		getAllDistrict();
		getAllBusinessType();
    // getAllTender("");
	}, []);
    const getAllDistrict = async() => {
        await axios
                .get(`/api/v1/dropDown/publicDropDown/allDistrict`)
                .then((res) => (setAllDistrict(res.data)))
                .catch(err => console.log(err))
    }
    const getAllBusinessType = async() => {
        await axios
                .get(`/api/v1/addition/addBusiness/allBusinessType`)
                .then((res) => (setAllBusinessType(res.data)))
                .catch(err => console.log(err))
    }

  const changeDist = async(e) => {
    e.preventDefault();

    if(e.target.value === "--All District--"){
      setDistrict({"districtName": "","districtLink": ""})

    }else
    {
      setDistrict({"districtName": e.target.value,"districtLink": e.target.value})
  }
 await setPage(0)
 await setHasMore(true)
}
  const changeBusinessType = async(e) => {
    e.preventDefault();
    if(e.target.value === "--All BusinessType--"){
      setBusinessType({"businessTypeName": "","businessTypeLink": ""})

    }else
    {
      setBusinessType({"businessTypeName": e.target.value,"businessTypeLink": e.target.value})
  }
  await setPage(0)
  await setHasMore(true)
  }

  return (
	<>
 <CheckPage
      from="MainApp"
      />
	<CommonPubDash compo = {
              <Box sx={{ width: '100%' }} className="mainbg" >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

       
              </Box>           
               <div>
                <Container>
                    <br/>
                    <Grid container spacing={2} >
                    <Grid item xs={6}>
                    <select
                    style={{width:"100%"}}
										id="education"
										onChange={(e) => {
                      changeDist(e)
										}}
									>
										<option disabled>--Please choose a District--</option>
                    <option >--All District--</option>

										{allDistrict.map((e) => (
											<option key={e.districtLink} value={e.districtLink} label={e.districtName} />
										))}
									</select>
                  
                    </Grid>
                    
                    <Grid item xs={6} >
                    <select
										id="education"
                    style={{width:"100%"}}

										onChange={(e) => {
                      changeBusinessType(e);
										}}
									>

										<option disabled>--Please choose a Business Type--</option>
										<option >--All Business--</option>
										{allBusinessType.map((e) => (
											<option key={e.businessTypeLink} value={e.businessTypeLink} label={e.businessTypeName} />
										))}
									</select>
         
                    </Grid>       
                 
                     </Grid>
      

                {
                  ("allTender.length" === "0") && (
                    <Typography style={{color: "#447eed", marginTop:"20px"}} 
                    variant="h5" gutterBottom component="div">
                    Sorry ! No Tender Found With This Filter.. 
                     </Typography>
                  )
                }


<div>
  Vivek
</div>
             <MultiShopCom 
           key={"v._id"}
           partnerName={"v.partnerName"}
           districtName={"props.shopDist?.districtName"}
           isVerified={"v.isVerified"}
           fullAddress={"v.fullAddress"}
           mobileNo={"v.mobileNo"}
           whatsAppNo={"v.whatsAppNo"}
           emailId={"v.emailId"}
          />       
               
                </Container>
              </div>
		<MySnackbar ref={snackRef} />

            </Box>
	} />
	</>
   
  );
}





