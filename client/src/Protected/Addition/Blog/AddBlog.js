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
} from "@mui/material";
import ImagePreviewDelete from "./../../../Components/Common/ImagePreviewDelete";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { MdDoneAll, MdClearAll,  MdDeleteForever } from "react-icons/md";
import CommonDash from "./../../MyDashboard/CommonDash"
import  {Search, StyledInputBase,SearchIconWrapper} from "./../../../Components/Common/SearchBar";
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function AddBlog() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [visibility, setVisibility] = useState(false);
	const [html, switchHtml] = useState(false);
	const [text, setText] = useState("");

	const [title, setTitle] = useState("");
	const [link, setLink] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [imageId, setImageId] = useState("");
	
	const [description, setDescription] = useState("");
	const [allBlog, setAllBlog] = useState([]);
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
			.get(`/api/v1/addition/blog/allblog/${word}`)
			.then((res) => (setAllBlog(res.data)))
			.catch((err) => console.log(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleOpen();
		let newCat = { _id: id, title,link, imageUrl,imageId, description };
		await axios
			.post(`/api/v1/addition/blog/${id}`, newCat)
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
		setImageUrl("");
		setImageId("");
	
	
		setDescription("");
	};
	const clearImage = () => { 

		setImageUrl("");
		setImageId("");
	}

	const setData = async (id) => {
		handleOpen();
		await axios
			.get(`/api/v1/addition/blog/get/${id}`)
			.then((res) => {		
				setId(res.data._id);
				setTitle(res.data.title);
				setLink(res.data.link);
				setImageUrl(res.data.image.url);
				setImageId(res.data.image.publicId);
			
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
				link = `/api/v1/other/fileupload/mainfolder/blogImage`
			} else if(name === "logo"){
				link = `/api/v1/other/fileupload/mainfolder/blogLogo`
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
							setImageUrl(res.data.result.secure_url)
							setImageId(res.data.result.public_id)
						}
					
					})
					.catch((err) => console.log(err));
			
		}
	};
	const handleDelete = (id) => {
		axios
			.delete(`/api/v1/addition/blog/delete/${id}`)
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
									<Chip color="primary" label="Add Blog" />
								</center>
							</Grid>
							<Grid item xs={4}>
                            <FormControlLabel
										control={<Switch checked={visibility} onChange={() => setVisibility(!visibility)} name="checkedA" />}
										label={visibility ? "Public" :"Private" }
									/>
                            </Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("title")}
									error={err.errIn === "title" ? true : false}
									label={err.errIn === "title" ? err.msg : "Blog Title"}
									placeholder="Title of the Blog"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("linkName")}
									error={err.errIn === "linkName" ? true : false}
									label={err.errIn === "Link" ? err.msg : "Blog link"}
									placeholder="Link of the Blog.."
									value={link}
									onChange={(e) => setLink(e.target.value)}
								/>
							</Grid>						
							
							<Grid item xs={6}>
							{imageUrl !== "" && (
							<ImagePreviewDelete 
							type ={"Image"} 
							imageLink={imageUrl} 
							imageId={imageId}
							clearImage ={clearImage} 
							clearLogo={clearImage}
							dataId={id}
							/>
							  

							)} 
							{
								imageUrl === "" && (
									<TextField
									// required
										variant="outlined"
										type="file"
										InputLabelProps={{ shrink: true }}
										inputProps={{ accept: "image/*" }}
										fullWidth
										onBlur={() => handleErr("image")}
										error={err.errIn === "image" ? true : false}
										label={err.errIn === "image" ? err.msg : "Blog Image"}
										onChange={(e) => imgUpload(e.target.files[0],"image")}
									/> 
								)
							}
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
              placeholder= {`Search Blog...`}
			  onChange={(e) => getData(e.target.value)}
			   
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
				{/* <SearchBar name={ "Blog"}  onChange={(e) => getData(e.target.value)} /> */}
				
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
								{allBlog.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
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
										count={allBlog.length}
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
