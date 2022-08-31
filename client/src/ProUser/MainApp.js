import React, { Fragment, useState, useEffect, useRef } from "react";
import MySnackbar from "../Components/MySnackbar";
import CommonPubDash from "../Components/Navigation/PublicAppBarNavBar/CommonPubDash"

import {Grid,Container,TextField,MenuItem,Typography, Box,Tabs,Tab, Autocomplete, Backdrop, CircularProgress} from '@mui/material/';
import { FcHome,FcBusinessman,FcLike } from "react-icons/fc";
import OneTenderCom from './ProComponent/Tender/OneTender';
import axios from "axios";
import { FcBookmark } from "react-icons/fc";
import CheckPage from "./ProComponent/Tender/checkForPage";
import InfiniteScroll from 'react-infinite-scroller';

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
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async(e) => {

    if(page === 0)
    {
      handleOpen()
    }
   if(hasMore){ 
    let myData = {district,department,page}
      await axios
              .post(`/api/v1/forPublicWeb/getTender/tenderWithFilter`,myData)
              .then(async(res) =>  {
                if(res.data.length <5){
                 await setHasMore(false)
                }
                setAllTender([...allTender, ...res.data])
              
                })
              .catch(err => console.log(err))}
              if(page === 0)
              {
                getAllSavedTender()

              }
              handleClose()
              setPage(+(+page+1))
  }

	const handleClose = () => {
	  setOpen(false);
	};
	const handleOpen = () => {
	  setOpen(true);
	};
	useEffect(() => {
		getAllDistrict();
		getAllDepartment();
    // getAllTender("");
	}, []);
    const getAllDistrict = async() => {
        await axios
                .get(`/api/v1/dropDown/publicDropDown/allDistrict`)
                .then((res) => (setAllDistrict(res.data)))
                .catch(err => console.log(err))
    }
    const getAllDepartment = async() => {
        await axios
                .get(`/api/v1/dropDown/publicDropDown/allDepartment`)
                .then((res) => (setAllDepartment(res.data)))
                .catch(err => console.log(err))
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
    const changeDist = async(e) => {
      e.preventDefault();

      if(e.target.value === "--All District--"){
        setDistrict({"districtName": "","districtLink": ""})

      }else
      {
        setDistrict({"districtName": e.target.value,"districtLink": e.target.value})
    }
    setAllTender([])
   await setPage(0)
   await setHasMore(true)
  }
    const changeDepartment = async(e) => {
      e.preventDefault();
      if(e.target.value === "--All Department--"){
        setDepartment({"departmentName": "","departmentLink": ""})

      }else
      {
        setDepartment({"departmentName": e.target.value,"departmentLink": e.target.value})
    }
    setAllTender([])
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

                <Tabs value={tabValue}   variant="fullWidth" onChange={(e,v)=>(setTabValue(v))} aria-label="tabs">
                  <Tab label="All Tender" icon={<FcBusinessman style={{fontSize:"1.2rem"}}/>}  />        
                  <Tab label="Saved Tender" icon={<FcBookmark style={{fontSize:"1.2rem"}}/>}  />
        
                </Tabs>
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
                    {/* <Autocomplete										
										options={allDistrict}
										filterSelectedOptions
										getOptionLabel={(option) => option?.districtName}
										isOptionEqualToValue={(option, value) =>
											 (option.districtName === value.districtName )}
										onChange={(e, v) => {
										
										
										}}
										value={district}
										renderInput={(params) => <TextField 
											{...params} variant="outlined"
                  helperText="Filter result with District"

											 label="Select District" />}
									/>  */}
                    </Grid>
                    
                    <Grid item xs={6} >
                    <select
										id="education"
                    style={{width:"100%"}}

										onChange={(e) => {
                      changeDepartment(e);
										}}
									>

										<option disabled>--Please choose a Department--</option>
										<option >--All Department--</option>
										{allDepartment.map((e) => (
											<option key={e.departmentLink} value={e.departmentLink} label={e.departmentName} />
										))}
									</select>
                    {/* <Autocomplete										
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
									/>  */}
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
{(tabValue === 0) &&(<InfiniteScroll
    pageStart={0}
    loadMore={() => handleLoadMore()}
    hasMore={hasMore}
    loader={		<div key={0} className="center">
									<CircularProgress />
									&nbsp;&nbsp;
									<Typography gutterBottom align="center">
										More Tender Loading...
									</Typography>
								</div>}
>
{
                  allTender.map((v,i)=> (
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
                 showLiveOnPhoto={v.showLiveOnPhoto}          
                  from={"allTender"}
                 />
                ))}
</InfiniteScroll>)}
            
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
                 showLiveOnPhoto={v.showLiveOnPhoto}        
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





