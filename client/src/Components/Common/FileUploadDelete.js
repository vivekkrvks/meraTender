import React, { Fragment, useState, useEffect, useRef } from "react";
import {
	Grid,
	Button,
	TextField,
} from "@mui/material";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

const theme = createTheme();

export default function ImagePreviewDelete(props) {
	const snackRef = useRef();
	const imgUpload = async (e, name) => {
		if (e) {
			const selectedFile = e;
			const imgData = new FormData();
			imgData.append("photo", selectedFile, selectedFile.name);
			let link = `/api/v1/other/fileupload/mainfolder/:folderName`
			if(props.folderName){
				link = `/api/v1/other/fileupload/mainfolder/${props.folderName}`
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
						
							props.setFileUrl(res.data.result.secure_url)
							props.setFileId(res.data.result.public_id)
						
					
					})
					.catch((err) => console.log(err));
			
		}
	};
	const handleUpdate = async (data) => {
		let myId = props.moduleId
		if(props.moduleId !== undefined && props.moduleId !== ""){
	
		let newCat = data
		await axios
			.post(props.updateApi, newCat)			
			.catch((err) => console.log(err));
		}
	};
	const deleteImage = async (id) => {
		console.log(props)
		await axios
		.post(`/api/v1/other/fileupload/delete`, {id})
		.then((res) => {

			if(res.data.variant==="success"){
				
					props.setFileUrl("");
					props.setFileId("");
					handleUpdate(props.noFileData)
			
				
			}
			// snackRef.current.handleSnack(res.data);		

		})
		.catch((err) => console.log(err));
};
	return (
		<>
				{props.fileUrl !== "" && (
				<Grid container spacing={0.25}>
                <Grid item xs={7}>
                    <Button 
                    href={props.fileUrl} target="_blank"
                    variant="contained" 
                    color="success" 
                    endIcon={<SendIcon />}>
                     {props.buttonName}
                    </Button>
                </Grid>
                <Grid item xs={5} >
                    <Button 
                    variant="outlined" 
                    onClick={()=>deleteImage(props.fileId)}
                    startIcon={<DeleteIcon/>}>
                    Delete
                    </Button>
                </Grid>
            </Grid>
							  

							)} 
							{
								props.fileUrl === "" && (
									<TextField
									// required
										variant="outlined"
										type="file"
										InputLabelProps={{ shrink: true }}
										inputProps={props.fileType}
										fullWidth
										onBlur={() => props.handleErr(props.fieldName)}
										label={ props.labelName}
										onChange={(e) => imgUpload(e.target.files[0],
											props.fieldName)}
									/> 
								)
							}
		</>
		
	
	);
}
























