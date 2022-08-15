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
import FileUploadDelete from "./../../../Components/Common/FileUploadDelete";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { MdDoneAll, MdClearAll,  MdDeleteForever } from "react-icons/md";
import CommonDash from "./../../MyDashboard/CommonDash"
import  {Search, StyledInputBase,SearchIconWrapper} from "./../../../Components/Common/SearchBar";
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function AddTender() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [visibility, setVisibility] = useState({
		name:"Public",
		id:"public"
	});

	const [tenderNumber, setTenderNumber] = useState("");
	const [tenderTitle, setTenderTitle] = useState("");
	const [openingDate, setOpeningDate] = useState("");
	const [closingDate, setClosingDate] = useState("");
	const [tenderAmount, setTenderAmount] = useState("");

	const [department, setDepartment] = useState({departmentName:"",departmentLink:""});
	const [allDepartment, setAllDepartment] = useState([]);
	const [state, setState] = useState({stateName:"Bihar",stateLink:"bihar"});
	const [allState, setAllState] = useState([]);
	const [district, setDistrict] = useState({districtName:"",districtLink:""});
	const [allDistrict, setAllDistrict] = useState([]);
	
	const [file1Url, setFile1Url] = useState("");
	const [file1Id, setFile1Id] = useState("");
	const [file2Url, setFile2Url] = useState("");
	const [file2Id, setFile2Id] = useState("");	
	const [shortDescription, setShortDescription] = useState("");
	const [showLiveOnPhoto, setShowLiveOnPhoto] = useState(false);

	const [isAdvance, setIsAdvance] = useState(false);
	const [tenderLink, setTenderLink] = useState("");
	const [coverImgUrl, setCoverImgUrl] = useState("");
	const [coverImgId, setCoverImgId] = useState("");	
	const [isHtml, switchHtml] = useState(false);
	const [longDescription, setLongDescription] = useState("");

	const [allTender, setAllTender] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	const [open, setOpen] = useState(false);
	const handleClose = () => {
	  setOpen(false);
	};
	const handleOpen = () => {
	  setOpen(true);
	};
	const swithVisibility = () => {
		getAllDepartment()
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
		getAllDepartment();
		getAllDistrict();
	}, []);
	const getAllDepartment = async () => {	
		await axios
			.get(`/api/v1/addition/department/alldepartment`)
			.then((res) => (setAllDepartment(res.data)))
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
			.get(`/api/v1/addition/tender/alltender/${word}`)
			.then((res) => (setAllTender(res.data)))
			.catch((err) => console.log(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleOpen();
		let newTen = { _id: id,
			visibility,tenderNumber,tenderTitle,
			openingDate,closingDate,tenderAmount,
			department,state,district,file1Url,file1Id,
			file2Url,file2Id,shortDescription,isAdvance,showLiveOnPhoto,
			tenderLink,coverImgUrl,coverImgId,isHtml,longDescription
			};
		await axios
			.post(`/api/v1/addition/tender/${id}`, newTen)
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
		setTenderNumber("");
		setTenderTitle("");
		setOpeningDate("");
		setClosingDate("");
		setTenderAmount("");

		setDepartment({departmentName:"",departmentLink:""})
		setState({stateName:"Bihar",stateLink:"bihar"});
		setDistrict({districtName:"",districtLink:""});
		setFile1Url("");
		setFile1Id("");
		setFile2Url("");
		setFile2Id("");	
		setShortDescription("");

		setIsAdvance(false);	
		setShowLiveOnPhoto(false);	
		setTenderLink("");	
		setCoverImgUrl("");	
		setCoverImgId("");	
		switchHtml(false);	
		setLongDescription("");	


	};
	const tenderLinkCreator = async (value) => {
		var strs = value.replace(/    /g,'-').replace(/   /g,'-').replace(/  /g,'-').replace(/ /g,'-');
		var rests = strs.replace(/  | |   |    |      /gi, function (x) {
			return  "";
		  });
		var rests = strs.replace(/--| |   |    |      /gi, function (x) {
			return  "";
		  });
		setTenderLink(rests.toLowerCase());

	};

	const setData = async (id) => {
		handleOpen();
		await axios
			.get(`/api/v1/addition/tender/get/${id}`)
			.then((res) => {		
		setId(res.data._id);
		setVisibility({
			name:"Public",
			id:"public"
		})
		setVisibility(res.data.visibility)
		setTenderNumber(res.data.tenderNumber);
		setTenderTitle(res.data.tenderTitle);
		setOpeningDate(res.data.openingDate);
		setClosingDate(res.data.closingDate);
		setTenderAmount(res.data.tenderAmount);

		setDepartment(res.data.department)
		setState({stateName:"Bihar",stateLink:"bihar"});
		setDistrict(res.data.district);
		setFile1Url(res.data.file1.url);
		setFile1Id(res.data.file1.publicId);
		setFile2Url(res.data.file2.url);
		setFile2Id(res.data.file2.publicId);	
		setShortDescription(res.data.shortDescription);

		setIsAdvance(res.data.isAdvance);	
		setShowLiveOnPhoto(res.data.showLiveOnPhoto);	
		setTenderLink(res.data.tenderLink);	
		setCoverImgUrl(res.data.coverImg.url);	
		setCoverImgId(res.data.coverImg.publicId);	
		switchHtml(res.data.isHtml);	
		setLongDescription(res.data.longDescription);	
				
			})
			.catch((err) => console.log(err));
			handleClose();
	};
	const handleDelete = (id) => {
		axios
			.delete(`/api/v1/addition/tender/delete/${id}`)
			.then((res) => alert(res.data.message))
			.then(() => getData(""))
			.catch((err) => console.log(err));
		handleClear();
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "tenderTitle":
				// if(tenderTitle.length  < 10){
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
									<Chip color="primary" label="Add Tender" />
								</center>
							</Grid>
							<Grid item xs={4}>
                            <FormControlLabel
										control={<Switch checked={(visibility.id === "public")} onChange={() => swithVisibility()} name="checkedA" />}
										label={visibility.name }
									/>
                            </Grid>
							<Grid item xs={12} md={4}>
								<TextField
								type="number"
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("tenderNumber")}
									error={err.errIn === "tenderNumber" ? true : false}
									label={err.errIn === "tenderNumber" ? err.msg : "Tender Number"}
									placeholder="Enter the tender Number.."
									value={tenderNumber}
									onChange={(e) => (setTenderNumber(e.target.value))}
								/>
							</Grid>		
							<Grid item xs={12}  md={8}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("tenderTitle")}
									error={err.errIn === "tenderTitle" ? true : false}
									label={err.errIn === "tenderTitle" ? err.msg : "Tender Title"}
									placeholder="Title of the Tender"
									value={tenderTitle}
									onChange={(e) => (setTenderTitle(e.target.value),tenderLinkCreator(e.target.value))}
								/>
							</Grid>
							<Grid item xs={12} md={4}>              
			 			 <TextField 
						 type="date" 
						 fullWidth  
						 value={openingDate}
						  required={false}
						   onChange={e=>(setOpeningDate(e.target.value),
						   setClosingDate(e.target.value))} 
						   inputProps={{ max:"2025-01-11",min:"2022-01-11"}}
						    InputLabelProps={{ shrink: true }}
							  label="Opening Date" />		  
			  				 </Grid>
						<Grid item xs={12} md={4}>
              
			  				<TextField 
							type="date" 
							fullWidth  
							value={closingDate} 
							required={false} 
							onChange={e=>(setClosingDate(e.target.value))} 
							inputProps={{ max:"2025-01-11",min:openingDate}} 
							InputLabelProps={{ shrink: true }}  
							label="Closing Date" />		  
			   			</Grid>									
							<Grid item xs={12} md={4}>
								<TextField
								type="number"
									variant="outlined"
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("tenderAmount")}
									error={err.errIn === "tenderAmount" ? true : false}
									label={err.errIn === "tenderAmount" ? err.msg : "Tender Amount"}
									placeholder="Enter the Tender Amount.."
									value={tenderAmount}
									onChange={(e) => setTenderAmount(e.target.value)}
								/>
							</Grid>	
							<Grid item xs={12} md={4}> 
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
											 label="Select Department" />}
									/> </Grid>

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
					
							<Grid item  xs={12} md={6}>
								<FileUploadDelete
								fileUrl={file1Url}
								setFileUrl={setFile1Url}
								fileId={file1Id}
								setFileId={setFile1Id}
								moduleId={id}
								buttonName={"File 1"}
								fileType={{ accept: "pdf/*" }}
								handleErr={handleErr}
								folderName={"file1"}	
								fieldName={"file1"}	
								labelName={"File 1"}
								updateApi={`/api/v1/addition/tender/${id}`}
								noFileData={{"file1Url":"","file1Id":""}}							
								/> 
							</Grid>
							<Grid item  xs={12} md={6}>
								<FileUploadDelete
								fileUrl={file2Url}
								setFileUrl={setFile2Url}
								fileId={file2Id}
								setFileId={setFile2Id}
								moduleId={id}
								buttonName={"File 2"}
								fileType={{ accept: "pdf/*" }}
								handleErr={handleErr}
								folderName={"file2"}	
								fieldName={"file2"}	
								labelName={"File 2"}
								updateApi={`/api/v1/addition/tender/${id}`}
								noFileData={{"file2Url":"","file2Id":""}}							
								/> 
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									onBlur={() => handleErr("shortDescription")}
									error={err.errIn === "shortDescription" ? true : false}
									label={err.errIn === "shortDescription" ? err.msg : "Short Description                                                                                             "}
									placeholder="few words..."
									value={shortDescription}
									onChange={(e) => setShortDescription(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
							<FormControlLabel
										control={<Switch checked={showLiveOnPhoto} onChange={() => setShowLiveOnPhoto(!showLiveOnPhoto)} name="checkShowLive" />}
										label={showLiveOnPhoto ? "Live" : "Normal"}
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
									onBlur={() => handleErr("tenderLink")}
									error={err.errIn === "tenderLink" ? true : false}
									label={err.errIn === "tenderLink" ? err.msg : "Tender link"}
									placeholder="Link of the Tender.."
									value={tenderLink}
									onChange={(e) => setTenderLink(e.target.value)}
								/>
							</Grid>						
							<Grid item  xs={12} md={6}>
								<FileUploadDelete
								fileUrl={coverImgUrl}
								setFileUrl={setCoverImgUrl}
								fileId={coverImgId}
								setFileId={setCoverImgId}
								moduleId={id}
								buttonName={"Cover Img "}
								fileType={{ accept: "pdf/*" }}
								handleErr={handleErr}
								folderName={"coverImgUrl"}	
								fieldName={"coverImgUrl"}	
								labelName={"Cover Img "}
								updateApi={`/api/v1/addition/tender/${id}`}
								noFileData={{"coverImgUrl":"","coverImgId":""}}							
								/> 
							</Grid>
						
                            <Grid item xs={12}>
									<FormControlLabel
										control={<Switch checked={isHtml} onChange={() => switchHtml(!isHtml)} name="checkedA" />}
										label={isHtml ? "HTML Mode" : "Editor Mode"}
									/>
									{isHtml ? (
										<TextField
											variant="filled"
											fullWidth
											rows={10}
											multiline
											required
											placeholder="Paste Your HTML Code here"
											helperText="You may use wordhtml.com"
											value={longDescription}
											onChange={(e) => setLongDescription(e.target.value)}
										/>
									) : (
										<CKEditor
											editor={ClassicEditor}
											data={longDescription}
											onChange={(event, editor) => {
												const data = editor.getData();
												setLongDescription(data);
											}}
										/>
									)}
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
              placeholder= {`Search Tender...`}
			  onChange={(e) => getData(e.target.value)}
			   
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
				{/* <SearchBar name={ "Tender"}  onChange={(e) => getData(e.target.value)} /> */}
				
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
								{allTender.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell component="td" scope="row">
											Name : {data.tenderTitle} ; Short Des : {data.shortDescription} <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										count={allTender.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onChangePage={(e, page) => setPage(page)}
										onChangeRowsPerPage={(r) => setRowsPerPage(r.target.value)}
									/>
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
