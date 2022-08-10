import React, { Fragment, useState, useEffect, useRef } from "react";
import MySnackbar from "../Components/MySnackbar";
import CommonPubDash from "../Components/Navigation/PublicAppBarNavBar/CommonPubDash"

import {Grid,Container,TextField,MenuItem,Typography, Box,Tabs,Tab, Autocomplete, Backdrop, CircularProgress} from '@mui/material/';
import { FcHome,FcBusinessman,FcLike } from "react-icons/fc";
import OneTenderCom from './ProComponent/Tender/OneTender';
import axios from "axios";
import { FcBookmark } from "react-icons/fc";


export default function FullWidthTabs() {
  const [tabValue, setTabValue]=useState(0)
  const [department, setDepartment]=useState({"departmentName":"","departmentLink":""})
  const [allDepartment, setAllDepartment]=useState([])
  const [district, setDistrict]=useState({"districtName":"","districtLink":""})
  const [allDistrict, setAllDistrict]=useState([])
  const [allTender, setAllTender]=useState([])
  const [allSavedTender, setAllSavedTender]=useState([])
	const snackRef = useRef();
	const [open, setOpen] = useState(false);
	const handleClose = () => {
	  setOpen(false);
	};
	const handleOpen = () => {
	  setOpen(true);
	};
	useEffect(() => {
		getAllDistrict("");
		getAllDepartment("");
    getAllTender("");
	}, [district,department]);
    const getAllDistrict = async() => {
        await axios
                .get(`/api/v1/dropDown/publicDropDown/allDistrict`)
                .then((res) => (setAllDistrict(res.data), console.log(allDistrict)))
                .catch(err => console.log(err))
    }
    const getAllDepartment = async() => {
        await axios
                .get(`/api/v1/dropDown/publicDropDown/allDepartment`)
                .then((res) => (setAllDepartment(res.data)))
                .catch(err => console.log(err))
    }
    const getAllTender = async() => {
      handleOpen()
      let myData = {district,department}
        await axios
                .post(`/api/v1/forPublicWeb/getTender/tenderWithFilter`,myData)
                .then((res) => (setAllTender(res.data)))
                .catch(err => console.log(err))
                getAllSavedTender()
    }
    const getAllSavedTender = async() => {
      handleOpen()

      let myData = {district,department}
        await axios
                .post(`/api/v1/forPublicWeb/getTender/saveTender`,myData)
                .then(
                //  res => console.log(res)
                  (res) => (setAllSavedTender(res.data)),
                  handleClose()
                  )
                .catch(err => console.log(err))
                handleClose()
    }
    const saveThisTender = async(oneId,oneDist,oneDepa,oneFrom,onePosition) => {
      handleOpen()

      let myData = {tenderId:oneId,district:oneDist,department:oneDepa}
        await axios
                .post(`/api/v1/forPublicWeb/saveTender/saveThis`,myData)
                .then((res) => 
                 { 
                  console.log(res.data)
                  if(res.data.variant === "success"){
                getAllSavedTender()
                    snackRef.current.handleSnack(res.data);
                    if(res.data.type === "added"){
                      let tp = allTender
                      tp[onePosition].isSaved = true
                      setAllTender(tp)
                      console.log(allTender)
                    } else  if(res.data.type === "removed"){
                      let tp = allTender
                      tp[onePosition].isSaved = false
                      setAllTender(tp)
                      console.log(allTender)

                    } 
                    handleClose()
                  }else {
                    snackRef.current.handleSnack(res.data);
                  }}
                )
                .catch(err => console.log(err))
                handleClose()
    }

  return (
	<>

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
                <Tabs value={tabValue} variant="fullWidth" onChange={(e,v)=>(setTabValue(v))} aria-label="tabs">
                  <Tab label="All Tender" icon={<FcBusinessman style={{fontSize:"1.2rem"}}/>}  />        
                  <Tab label="Saved Tender" icon={<FcBookmark style={{fontSize:"1.2rem"}}/>}  />
        
                </Tabs>
              </Box>           
        
               <div>
                <Container>
                    <br/>
                    <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <Autocomplete										
										options={allDistrict}
										filterSelectedOptions
										getOptionLabel={(option) => option?.districtName}
										isOptionEqualToValue={(option, value) =>
											 (option.districtName === value.districtName )}
										onChange={(e, v) => {
											setDistrict(v);
										
										}}
										value={district}
										renderInput={(params) => <TextField 
											{...params} variant="outlined"
                  helperText="Filter result with District"

											 label="Select District" />}
									/> 
                    </Grid>
                    <Grid item xs={6}>
                    <Autocomplete										
										options={allDepartment}
										filterSelectedOptions
										getOptionLabel={(option) => option?.departmentName}
										isOptionEqualToValue={(option, value) =>
											 (option.departmentName === value.departmentName )}
										onChange={(e, v) => {
											setDepartment(v);
										
										}}
										value={department}
										renderInput={(params) => <TextField 
											{...params} variant="outlined"
                  helperText="Filter result with Department"

											 label="Select Department" />}
									/> 
                    </Grid>
        
        
                 
                </Grid>
                {
                  (allTender.length === 0) && (
                    <Typography style={{color: "#447eed", marginTop:"20px"}} 
                    variant="h5" gutterBottom component="div">
                    Sorry ! No Tender Found With This Filter.. 
                     </Typography>
                  )
                }
          
                {(tabValue === 0) &&(allTender.map((v,i)=> (
                 <OneTenderCom 
                 key={v._id}
                 saveThisTender={saveThisTender}
                 id={v._id}
                 position={i}
                 tenderTitle={v.tenderTitle}
                 openingDate={v.openingDate}
                 closingDate={v.closingDate}
                 tenderAmount={v.tenderAmount}
                 district={v.district}
                 shortDescription={v.shortDescription}
                 department={v.department}
                 departmentLogo={v.departmentLogo}
                 file1Url={v.file1.url}
                 file2Url={v.file2.url}
                 isSaved={v.isSaved}           
                  from={"allTender"}
                 />
                )))}
                {(tabValue === 1) &&(allSavedTender.map((v,i)=> (
                 <OneTenderCom 
                 key={v._id}
                 saveThisTender={saveThisTender}
                 id={v._id}
                 position={i}
                 tenderTitle={v.tenderTitle}
                 openingDate={v.openingDate}
                 closingDate={v.closingDate}
                 tenderAmount={v.tenderAmount}
                 district={v.district}
                 shortDescription={v.shortDescription}
                 department={v.department}
                 departmentLogo={v.departmentLogo}
                 file1Url={v.file1.url}
                 file2Url={v.file2.url}    
                 isSaved={v.isSaved}           
                 from={"allSavedTender"}
                 />
                )))}
           
               
        
                </Container>
              </div>
		<MySnackbar ref={snackRef} />

            </Box>
	} />
	</>
   
  );
}





