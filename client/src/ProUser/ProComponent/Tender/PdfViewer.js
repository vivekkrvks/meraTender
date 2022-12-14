import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';

import axios from "axios";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { GrDocumentPdf } from 'react-icons/gr';
import { saveAs } from 'file-saver'
import OneShopCom from './OneShop';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Link } from 'react-router-dom';
import MultiShopCom from '../../Business/Component/multiBusiness';
import OneBusinessDialogCom from '../BusinessCom/OneBusinessDialog'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PdfDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [myUrl,setMyUrl] = useState(props.fileUrl);
  const [viewUrl,setViewUrl] = useState(props.fileUrl);
  const [allBusiness,setAllBusiness] = useState([]);

  const downloadImage = () => {
    let url = myUrl
    let fileExtension = url.split('.').pop();
    let result = url.replace(fileExtension, "pdf");
    setMyUrl(result)
  }
  const showImage = () => {
    let url = viewUrl
    let fileExtension = url.split('.').pop();
    let result = url.replace(fileExtension, "jpg");
    setViewUrl(result)
  }

	useEffect(() => {
		downloadImage()
    showImage()
	}, [props]);


    const getAllBusiness = async() => {
        await axios
                .get(`/api/v1/addition/addBusiness/forPublic/business/${props.shopDist?.districtLink}/${props.shopCat}`)
                .then((res) => (setAllBusiness(res.data)))
                .catch(err => console.log(err))
    }

  const handleClickOpen = () => {
    getAllBusiness()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <a onClick={handleClickOpen}>
        {props.fileIcon  }

        </a>
    
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar color="default" sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {props.fileName}  Document 
            </Typography>
     <a href={myUrl} target="_blank" download={props.fileName}>
          <Button onClick = {() => downloadImage()} variant="contained" color="primary">
             Download
            </Button></a>

          </Toolbar>
        </AppBar>
        <div  >
        <TransformWrapper style={{maxWidth:"100%",height:"auto"}}>
        <TransformComponent style={{maxWidth:"100%",height:"auto"}}>
          <img style={{maxWidth:"100%",height:"auto"}} src={viewUrl} alt="test" />
        </TransformComponent>
      </TransformWrapper>
        {/* <img style={{maxWidth:"100%",height:"auto"}} src={viewUrl} /> */}
     </div>
     <div style={{marginLeft:"12.5%"}}>
        <a href={myUrl} target="_blank" download={props.fileName} >
          <Button onClick = {() => downloadImage()} variant="contained" color="secondary">
          📄Download Full {props.fileName} Document📄
            </Button></a>
    </div>
    <div style={{marginTop:"10px"}}>
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        {/* <h3>{props.shopDist?.districtLink}</h3>
        <h3>{props.shopCat}</h3> */}
        <Chip label="You May Contact below Cafe 👇👇👇" color="success" />
      </Stack>
    
    </Stack>
    {
  allBusiness.map((v,i) => (
   
    <OneBusinessDialogCom 
       key={v._id}
    v = {v}
    />


   
  ))
} 
       
    </div>
      </Dialog>
    </div>
  );
}