import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "../../useStyles";
import MySnackbar from "../../../Components/MySnackbar";
import {
	Grid,
	Chip,
	Paper,
	TextField,
	Table,
	TableHead,
	TableRow,
	Tooltip,
	Fab,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Divider,
    FormControlLabel,
    Switch,
	Autocomplete,
} from "@mui/material";

import axios from "axios";
import { MdDoneAll, MdClearAll,  MdDeleteForever } from "react-icons/md";
import CommonDash from "../../MyDashboard/CommonDash"
import  {Search, StyledInputBase,SearchIconWrapper} from "../../../Components/Common/SearchBar";
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function AddPartner() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [visibility, setVisibility] = useState({
		name:"Public",
		id:"public"
	});
	const [isVerified, setIsVerified] = useState(false);
	const [partnerName, setPartnerName] = useState("");
	const [partnerLink, setPartnerLink] = useState("");

	const [state, setState] = useState({stateName:"Bihar",stateLink:"bihar"});
	const [allState, setAllState] = useState([]);
	const [district, setDistrict] = useState({districtName:"",districtLink:""});
	const [allDistrict, setAllDistrict] = useState([]);
	const [partnerType, setPartnerType] = useState({partnerTypeName:"",partnerTypeLink:""});
	const [allPartnerType, setAllPartnerType] = useState([]);

	const [fullAddress, setFullAddress] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [whatsAppNo, setWhatsAppNo] = useState("");
	const [emailId, setEmailId] = useState("");

	const [isAdvance, setIsAdvance] = useState(false);

	const [allPartner, setAllPartner] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	const [open, setOpen] = useState(false);
	const handleClose = () => {
	  setOpen(false);
	};
	const handleOpen = () => {
	  setOpen(true);
	};
	const switchVisibility = () => {
	  if(visibility.id === "private"){
		setVisibility({
			name:"Public",
			id:"public"
		})
	  } else {
		setVisibility({
			name:"Private",
			id:"private"
		})
	  }
	};
	useEffect(() => {
		getData("");
		getAllDistrict();
		getAllPartnerType();
	}, []);

	const getAllPartnerType = async () => {

		await axios
			.get(`/api/v1/addition/addPartner/allPartnerType`)
			.then((res) => (console.log(res.data),setAllPartnerType(res.data)))
			.catch((err) => console.log(err));
	};
	const getAllDistrict = async () => {
	let stateLink = "bihar"
		await axios
			.get(`/api/v1/addition/location/district/bystate/${stateLink}`)
			.then((res) => (setAllDistrict(res.data)))
			.catch((err) => console.log(err));
	};
	const getData = async (word) => {	
		await axios
			.get(`/api/v1/addition/addPartner/allPartner/${word}`)
			.then((res) => (setAllPartner(res.data)))
			.catch((err) => console.log(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleOpen();
		let newCaf = { _id: id,
		visibility,isVerified,partnerType,partnerName,
			state,district,fullAddress,
			mobileNo,whatsAppNo,partnerLink,emailId,isAdvance
			};
		await axios
			.post(`/api/v1/addition/addPartner/${id}`, newCaf)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getData("");
				handleClose()
				if(res.data.variant==="success"){
					handleClear();
				}
			})
			.catch((err) => console.log(err));
	};
	const handleClear = () => {
		setId("");
		setVisibility({
			name:"Public",
			id:"public"
		});
		setPartnerType({partnerTypeName:"",partnerTypeLink:""})
		setIsVerified(false);
		setPartnerName("");
		setPartnerLink("");
		setState("");
		setDistrict("");
		setState({stateName:"Bihar",stateLink:"bihar"});
		setDistrict({districtName:"",districtLink:""});

		setFullAddress("");
		setMobileNo("");
		setWhatsAppNo("");
		setEmailId("");

		setIsAdvance(false);	


	};
	const partnerLinkCreator = async (value) => {
		var strs = value.replace(/    /g,'-').replace(/   /g,'-').replace(/  /g,'-').replace(/ /g,'-');
		var rests = strs.replace(/  | |   |    |      /gi, function (x) {
			return  "";
		  });
		 rests = strs.replace(/--| |   |    |      /gi, function (x) {
			return  "";
		  });
		setPartnerLink(rests.toLowerCase());

	};

	const setData = async (id) => {
		handleOpen();
		await axios
			.get(`/api/v1/addition/partner/get/${id}`)
			.then((res) => {		
		setId(res.data._id);
		setVisibility({
			name:"Public",
			id:"public"
		})
		setVisibility(res.data.visibility)
		console.log(res.data.isVerified)
		console.log(isVerified)
		setIsVerified(res.data.isVerified)
		console.log(isVerified)

		setPartnerName(res.data.partnerName);
		setPartnerLink(res.data.partnerLink);
		setState({stateName:"Bihar",stateLink:"bihar"});
		setDistrict(res.data.district);
		setFullAddress(res.data.fullAddress);
		setMobileNo(res.data.mobileNo);
		setWhatsAppNo(res.data.whatsAppNo);
		setEmailId(res.data.emailId);

		setIsAdvance(res.data.isAdvance);	
	
				
			})
			.catch((err) => console.log(err));
			handleClose();
	};
	const handleDelete = (id) => {
		axios
			.delete(`/api/v1/addition/partner/delete/${id}`)
			.then((res) => alert(res.data.message))
			.then(() => getData(""))
			.catch((err) => console.log(err));
		handleClear();
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "mobileNo":
				// if(mobileNo.length  < 10){
				//     setErr({errIn:"mobileNo", msg:"Enter 10 Digits Mobile No."})
				// }else setErr({errIn:"", msg:""})
				break;
			default:
				break;
		}
	};
	return (
		<>
		<CommonDash compo = {
			<Fragment>
		<Grid container>
			<Grid item xs={12} md={8}>
	
				<Paper className={(visibility.id === "public")?  classes.entryAreaGreen : classes.entryAreaRed}>
					
				<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
					<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
						<Grid container spacing={2}>
							
							<Grid item xs={4}></Grid>
							<Grid item xs={4}>
								<center>
									<Chip color="primary" label="Add Partner" />
								</center>
							</Grid>
							<Grid item xs={4}>
                            <FormControlLabel
										control={<Switch checked={(visibility.id === "public")} onChange={() => switchVisibility()} name="checkedA" />}
										label={visibility.name }
									/>
                            </Grid>
							<Grid item xs={12} md={5}> 
			 						 <Autocomplete										
										options={allPartnerType}
										filterSelectedOptions
										getOptionLabel={(option) => option?.partnerTypeName}
										isOptionEqualToValue={(option, value) => (option.partnerTypeName === value.partnerTypeName )}
										onChange={(e, v) => {
											setPartnerType(v);										
										}}
										value={partnerType}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select Partner Type" />}
									/>            
      								
									</Grid>
						
																						
							<Grid item xs={12} md={2}> 
			 						 <Autocomplete										
										options={allState}
										disabled
										filterSelectedOptions
										getOptionLabel={(option) => option?.stateName}
										isOptionEqualToValue={(option, value) => (option.stateName === value.stateName )}
										onChange={(e, v) => {
											setState(v);										
										}}
										value={state}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select State" />}
									/>            
      								
									</Grid>
							<Grid item xs={12} md={5}> 
			 						 <Autocomplete										
										options={allDistrict}
										filterSelectedOptions
										getOptionLabel={(option) => option?.districtName}
										isOptionEqualToValue={(option, value) => (option.districtName === value.districtName )}
										onChange={(e, v) => {
											setDistrict(v);										
										}}
										value={district}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select District" />}
									/>          
									</Grid>
									<Grid item xs={12} md={12}>
								<TextField
								
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("partnerName")}
									error={err.errIn === "partnerName" ? true : false}
									label={err.errIn === "partnerName" ? err.msg : "Partner Name"}
									placeholder="Enter the partner Number.."
									value={partnerName}
									onChange={(e) => (setPartnerName(e.target.value),partnerLinkCreator(e.target.value))}
								/>
							</Grid>	
									<Grid item xs={12}  md={6}>
								<TextField
								type="number"
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: 10 }}
									onBlur={() => handleErr("mobileNo")}
									error={err.errIn === "mobileNo" ? true : false}
									label={err.errIn === "mobileNo" ? err.msg : "Mobile No"}
									placeholder="Enter Mobile"
									value={mobileNo}
									onChange={(e) => (setMobileNo(e.target.value))}
								/>
							</Grid>
									<Grid item xs={12}  md={6}>
								<TextField
								type="number"
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "10" }}
									onBlur={() => handleErr("whatsAppNo")}
									error={err.errIn === "whatsAppNo" ? true : false}
									label={err.errIn === "whatsAppNo" ? err.msg : "WhatsApp No"}
									placeholder="Enter Mobile"
									value={whatsAppNo}
									onChange={(e) => (setWhatsAppNo(e.target.value))}
								/>
							</Grid>
									<Grid item xs={12}  md={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "100" }}
									onBlur={() => handleErr("fullAddress")}
									error={err.errIn === "fullAddress" ? true : false}
									label={err.errIn === "fullAddress" ? err.msg : "Full Address"}
									placeholder="Enter Full Address"
									value={fullAddress}
									onChange={(e) => (setFullAddress(e.target.value))}
								/>
							</Grid>
							
					
						
							<Grid item xs={12}>
							<FormControlLabel
										control={<Switch checked={isVerified} onChange={() => setIsVerified(!isVerified)} name="checkedAB" />}
										label={isVerified ? "Verified" : "Not Verified"}
									/></Grid>	
						
							<Grid item xs={12}>
							<FormControlLabel
										control={<Switch checked={isAdvance} onChange={() => setIsAdvance(!isAdvance)} name="checkedA" />}
										label={isAdvance ? "Advance" : "Basic"}
									/></Grid>	
		{isAdvance &&(	<>				<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("partnerLink")}
									error={err.errIn === "partnerLink" ? true : false}
									label={err.errIn === "partnerLink" ? err.msg : "Partner link"}
									placeholder="Link of the Partner.."
									value={partnerLink}
									onChange={(e) => setPartnerLink(e.target.value)}
								/>
							</Grid>	
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("emailId")}
									error={err.errIn === "emailId" ? true : false}
									label={err.errIn === "emailId" ? err.msg : "Email Id"}
									placeholder="Enter partner emailId.."
									value={emailId}
									onChange={(e) => setEmailId(e.target.value)}
								/>
							</Grid>							
					
				
							<Grid item xs={12}>
								<Divider />
							</Grid>
							</>)}
							<Grid item xs={12}>
								<center>
									<Tooltip title={id === "" ? "Save" : "Update"}>
										<Fab color="primary" type="submit" className={classes.button}>
											<MdDoneAll />
										</Fab>
									</Tooltip>
									<Tooltip title="Clear All">
										<Fab size="small" color="secondary" onClick={() => handleClear()} className={classes.button}>
											<MdClearAll />
										</Fab>
									</Tooltip>
									{id !== "" && (
											<Tooltip title="Delete Forever">
												<Fab size="small" color="secondary" onClick={() => handleDelete(id)} className={classes.button}>
													<MdDeleteForever />
												</Fab>
											</Tooltip>
										)}
						
								</center>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
			<Grid item xs={12} md={4}>
				{/* Search Section */}
				<div className={classes.search}>
				<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder= {`Search Partner...`}
			  onChange={(e) => getData(e.target.value)}
			   
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
				{/* <SearchBar name={ "Partner"}  onChange={(e) => getData(e.target.value)} /> */}
				
				</div>
				<div className={classes.searchResult}>
					<Paper>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell component="th" scope="row">
										Search Results
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allPartner.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell component="td" scope="row">
											Partner Name : {data.partnerName} , fullAddress : {data.fullAddress} <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
								<TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allPartner.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => setPage(page)}
          onRowsPerPageChange={ (event) => (setRowsPerPage(parseInt(event.target.value, 10)),setPage(0))}
        />
									{/* <TablePagination
										count={allPartner.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onChangePage={(e, page) => setPage(page)}
										onChangeRowsPerPage={(r) => setRowsPerPage(r.target.value)}
									/> */}
								</TableRow>
							</TableFooter>
						</Table>
					</Paper>
				</div>
			</Grid>
		</Grid>
		<MySnackbar ref={snackRef} />
	</Fragment>

		} />
		</>
		
	
	);
}
