import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "./../../useStyles";
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
import CommonDash from "./../../MyDashboard/CommonDash"
import  {Search, StyledInputBase,SearchIconWrapper} from "./../../../Components/Common/SearchBar";
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function AddCafe() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [visibility, setVisibility] = useState({
		name:"Public",
		id:"public"
	});
	const [isVerified, setIsVerified] = useState(false);
	const [cafeName, setCafeName] = useState("");
	const [cafeLink, setCafeLink] = useState("");

	const [state, setState] = useState({stateName:"Bihar",stateLink:"bihar"});
	const [allState, setAllState] = useState([]);
	const [district, setDistrict] = useState({districtName:"",districtLink:""});
	const [allDistrict, setAllDistrict] = useState([]);

	const [fullAddress, setFullAddress] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [whatsAppNo, setWhatsAppNo] = useState("");
	const [emailId, setEmailId] = useState("");

	const [isAdvance, setIsAdvance] = useState(false);

	const [allCafe, setAllCafe] = useState([]);
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
	}, []);

	const getAllDistrict = async () => {
	let stateLink = "bihar"
		await axios
			.get(`/api/v1/addition/location/district/bystate/${stateLink}`)
			.then((res) => (setAllDistrict(res.data)))
			.catch((err) => console.log(err));
	};
	const getData = async (word) => {	
		await axios
			.get(`/api/v1/addition/cafe/allcafe/${word}`)
			.then((res) => (setAllCafe(res.data)))
			.catch((err) => console.log(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleOpen();
		let newCaf = { _id: id,
			visibility,isVerified,cafeName,
			state,district,fullAddress,
			mobileNo,whatsAppNo,cafeLink,emailId,isAdvance
			};
		await axios
			.post(`/api/v1/addition/cafe/${id}`, newCaf)
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
		})
		setIsVerified(false);
		setCafeName("");
		setCafeLink("");
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
	const cafeLinkCreator = async (value) => {
		var strs = value.replace(/    /g,'-').replace(/   /g,'-').replace(/  /g,'-').replace(/ /g,'-');
		var rests = strs.replace(/  | |   |    |      /gi, function (x) {
			return  "";
		  });
		 rests = strs.replace(/--| |   |    |      /gi, function (x) {
			return  "";
		  });
		setCafeLink(rests.toLowerCase());

	};

	const setData = async (id) => {
		handleOpen();
		await axios
			.get(`/api/v1/addition/cafe/get/${id}`)
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

		setCafeName(res.data.cafeName);
		setCafeLink(res.data.cafeLink);
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
			.delete(`/api/v1/addition/cafe/delete/${id}`)
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
									<Chip color="primary" label="Add Cafe" />
								</center>
							</Grid>
							<Grid item xs={4}>
                            <FormControlLabel
										control={<Switch checked={(visibility.id === "public")} onChange={() => switchVisibility()} name="checkedA" />}
										label={visibility.name }
									/>
                            </Grid>
							<Grid item xs={12} md={12}>
								<TextField
								
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("cafeName")}
									error={err.errIn === "cafeName" ? true : false}
									label={err.errIn === "cafeName" ? err.msg : "Cafe Name"}
									placeholder="Enter the cafe Number.."
									value={cafeName}
									onChange={(e) => (setCafeName(e.target.value),cafeLinkCreator(e.target.value))}
								/>
							</Grid>		
																						
							<Grid item xs={12} md={4}> 
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
							<Grid item xs={12} md={4}> 
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
									<Grid item xs={12}  md={6}>
								<TextField
								type="number"
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "10" }}
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
									onBlur={() => handleErr("cafeLink")}
									error={err.errIn === "cafeLink" ? true : false}
									label={err.errIn === "cafeLink" ? err.msg : "Cafe link"}
									placeholder="Link of the Cafe.."
									value={cafeLink}
									onChange={(e) => setCafeLink(e.target.value)}
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
									placeholder="Enter cafe emailId.."
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
              placeholder= {`Search Cafe...`}
			  onChange={(e) => getData(e.target.value)}
			   
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
				{/* <SearchBar name={ "Cafe"}  onChange={(e) => getData(e.target.value)} /> */}
				
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
								{allCafe.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell component="td" scope="row">
											Cafe Name : {data.cafeName} , fullAddress : {data.fullAddress} <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
								<TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allCafe.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => setPage(page)}
          onRowsPerPageChange={ (event) => (setRowsPerPage(parseInt(event.target.value, 10)),setPage(0))}
        />
									{/* <TablePagination
										count={allCafe.length}
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
