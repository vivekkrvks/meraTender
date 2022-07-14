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
} from "@mui/material";
import ImagePreviewDelete from "./../../../Components/Common/ImagePreviewDelete";

import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama, MdLock, MdPublic, MdDeleteForever } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../../MyDashboard/CommonDash"
import  {Search, StyledInputBase,SearchIconWrapper} from "./../../../Components/Common/SearchBar";
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme();

export default function AddDepartment() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [departmentName, setDepartmentName] = useState("");
	const [link, setLink] = useState("");
	const [logoUrl, setLogoUrl] = useState("");
	const [logoId, setLogoId] = useState("");
	const [description, setDescription] = useState("");
	const [allCat, setAllCat] = useState([]);
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
			.get(`/api/v1/addition/department/alldepartment/${word}`)
			.then((res) => (setAllCat(res.data)))
			.catch((err) => console.log(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleOpen();
		let newCat = { _id: id, departmentName,link,  logoUrl,logoId, description };
		await axios
			.post(`/api/v1/addition/department/${id}`, newCat)
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
		setDepartmentName("");
		setLink("");

		setLogoUrl("");
		setLogoId("");
		setDescription("");
	};
	const clearImage = () => { 


	}
	const clearLogo = () => {

		setLogoUrl("");
		setLogoId("");
	}
	const setData = async (id) => {
		handleOpen();
		await axios
			.get(`/api/v1/addition/department/get/${id}`)
			.then((res) => {		
				setId(res.data._id);
				setDepartmentName(res.data.departmentName);
				setLink(res.data.link);
			
				setLogoUrl(res.data.logo.url);
				setLogoId(res.data.logo.publicId);				
				setDescription(res.data.description);
				
			})
			.catch((err) => console.log(err));
			handleClose();
	};

	const imgUpload = async (e, name) => {
		if (e) {
			const selectedFile = e;
			const imgData = new FormData();
			imgData.append("photo", selectedFile, selectedFile.name);
			let link = `/api/v1/other/fileupload/mainfolder/:folderName`
			if(name === "image"){
				link = `/api/v1/other/fileupload/mainfolder/departmentImage`
			} else if(name === "logo"){
				link = `/api/v1/other/fileupload/mainfolder/departmentLogo`
			}
			
				await axios
					.post(link, imgData, {
						headers: {
							accept: "application/json",
							"Accept-Language": "en-US,en;q=0.8",
							"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
						},
					})
					.then((res) => {
						if (name === "image") {
				
						}else if (name === "logo") {
							setLogoUrl(res.data.result.secure_url)
							setLogoId(res.data.result.public_id)
						}
					
					})
					.catch((err) => console.log(err));
			
		}
	};
	const handleDelete = (id) => {
		axios
			.delete(`/api/v1/addition/department/delete/${id}`)
			.then((res) => alert(res.data.message))
			.then(() => getData(""))
			.catch((err) => console.log(err));
		handleClear();
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "departmentName":
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
	
				<Paper className={classes.entryArea}>
					
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
									<Chip color="primary" label="Add Department" />
								</center>
							</Grid>
							<Grid item xs={4}></Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("departmentName")}
									error={err.errIn === "departmentName" ? true : false}
									label={err.errIn === "departmentName" ? err.msg : "Department Name"}
									placeholder="Name of the Department.."
									value={departmentName}
									onChange={(e) => setDepartmentName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("linkName")}
									error={err.errIn === "linkName" ? true : false}
									label={err.errIn === "Link" ? err.msg : "Department link"}
									placeholder="Link of the Department.."
									value={link}
									onChange={(e) => setLink(e.target.value)}
								/>
							</Grid>
						
							<Grid item xs={12} md={6}>
							{logoUrl !== "" && (
							<ImagePreviewDelete 
							type ={"Logo"} 
							imageLink={logoUrl} 
							imageId={logoId} 
							clearImage ={clearImage} 
							clearLogo={clearLogo}
							dataId={id}
							/>

							)} 
							{
								logoUrl === "" && (
									<TextField
									// required
										variant="outlined"
										type="file"
										InputLabelProps={{ shrink: true }}
										inputProps={{ accept: "image/png*" }}
										fullWidth
										onBlur={() => handleErr("logo")}
										error={err.errIn === "logo" ? true : false}
										label={err.errIn === "logo" ? err.msg : "Logo (PNG Only)"}
										onChange={(e) =>  imgUpload(e.target.files[0],"logo")}
									/> 
								)
							}			
	  						</Grid>
							
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									onBlur={() => handleErr("description")}
									error={err.errIn === "description" ? true : false}
									label={err.errIn === "description" ? err.msg : "Description "}
									placeholder="few words..."
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Divider />
							</Grid>
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
              placeholder= {`Search Department...`}
			  onChange={(e) => getData(e.target.value)}
			   
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
				{/* <SearchBar name={ "Department"}  onChange={(e) => getData(e.target.value)} /> */}
				
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
								{allCat.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell component="td" scope="row">
											Name : {data.departmentName} ; Description : {data.description} <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										count={allCat.length}
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
