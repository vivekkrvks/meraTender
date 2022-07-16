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
	const [visibility, setVisibility] = useState(true);
	const [isAdvance, setIsAdvance] = useState(true);
	const [html, switchHtml] = useState(false);
	const [text, setText] = useState("");

	const [title, setTitle] = useState("");
	const [link, setLink] = useState("");
	const [file1Url, setFile1Url] = useState("");
	const [file1Id, setFile1Id] = useState("");
	const [file2Url, setFile2Url] = useState("");
	const [file2Id, setFile2Id] = useState("");
	const [coverImgUrl, setCoverImgUrl] = useState("");
	const [coverImgId, setCoverImgId] = useState("");

	const [openingDate, setOpeningDate] = useState("");
	const [closingDate, setClosingDate] = useState("");
	const [tenderNumber, setTenderNumber] = useState("");
	const [tenderAmount, setTenderAmount] = useState("");
	const [department, setDepartment] = useState("");
	const [allDepartment, setAllDepartment] = useState([]);
	const [state, setState] = useState("");
	const [allState, setAllState] = useState([]);
	const [district, setDistrict] = useState("");
	const [allDistrict, setAllDistrict] = useState([]);

	
	const [description, setDescription] = useState("");
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
	useEffect(() => {
		getData("");
	}, []);
	const getData = async (word) => {
	
		await axios
			.get(`/api/v1/addition/tender/alltender/${word}`)
			.then((res) => (setAllTender(res.data)))
			.catch((err) => console.log(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleOpen();
		let newCat = { _id: id, title,link, file1Url,file1Id, description };
		await axios
			.post(`/api/v1/addition/tender/${id}`, newCat)
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
		setTitle("");
		setLink("");
		setFile1Url("");
		setFile1Id("");
	
	
		setDescription("");
	};


	const setData = async (id) => {
		handleOpen();
		await axios
			.get(`/api/v1/addition/tender/get/${id}`)
			.then((res) => {		
				setId(res.data._id);
				setTitle(res.data.title);
				setLink(res.data.link);
				setFile1Url(res.data.image.url);
				setFile1Id(res.data.image.publicId);
			
				setDescription(res.data.description);
				
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
			case "title":
				// if(title.length  < 10){
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
	
				<Paper className={visibility?  classes.entryAreaGreen : classes.entryAreaRed}>
					
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
										control={<Switch checked={visibility} onChange={() => setVisibility(!visibility)} name="checkedA" />}
										label={visibility ? "Public" :"Private" }
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
									onChange={(e) => setTenderNumber(e.target.value)}
								/>
							</Grid>		
							<Grid item xs={12}  md={8}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("title")}
									error={err.errIn === "title" ? true : false}
									label={err.errIn === "title" ? err.msg : "Tender Name"}
									placeholder="Title of the Tender"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
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
									required
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
								updateApi={`/api/v1/addition/category/${id}`}
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
								updateApi={`/api/v1/addition/category/${id}`}
								noFileData={{"file2Url":"","file2Id":""}}							
								/> 
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									onBlur={() => handleErr("description")}
									error={err.errIn === "description" ? true : false}
									label={err.errIn === "description" ? err.msg : "Short Description                                                                                             "}
									placeholder="few words..."
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Grid>
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
									onBlur={() => handleErr("linkName")}
									error={err.errIn === "linkName" ? true : false}
									label={err.errIn === "Link" ? err.msg : "Tender link"}
									placeholder="Link of the Tender.."
									value={link}
									onChange={(e) => setLink(e.target.value)}
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
								updateApi={`/api/v1/addition/category/${id}`}
								noFileData={{"coverImgUrl":"","coverImgId":""}}							
								/> 
							</Grid>
						
                            <Grid item xs={12}>
									<FormControlLabel
										control={<Switch checked={html} onChange={() => switchHtml(!html)} name="checkedA" />}
										label={html ? "HTML Mode" : "Editor Mode"}
									/>
									{html ? (
										<TextField
											variant="filled"
											fullWidth
											rows={10}
											multiline
											required
											placeholder="Paste Your HTML Code here"
											helperText="You may use wordhtml.com"
											value={text}
											onChange={(e) => setText(e.target.value)}
										/>
									) : (
										<CKEditor
											editor={ClassicEditor}
											data={text}
											onChange={(event, editor) => {
												const data = editor.getData();
												setText(data);
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
											Name : {data.title} ; Description : {data.description} <br />
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
