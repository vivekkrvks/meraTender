import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';


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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PdfDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [myUrl,setMyUrl] = useState(props.fileUrl);

  const downloadImage = () => {
    let url = myUrl
    let fileExtension = url.split('.').pop();
    let result = url.replace(fileExtension, "pdf");
    setMyUrl(result)
  }

	useEffect(() => {
		downloadImage()
	}, [props]);


  const handleClickOpen = () => {
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
              Document
            </Typography>
     <a href={myUrl} target="_blank" download={props.fileName}>
          <Button onClick = {() => downloadImage()} variant="contained" color="primary">
             Download
            </Button></a>

          </Toolbar>
        </AppBar>
        <div >
        <img style={{maxWidth:"100%",height:"auto"}} src={props.fileUrl} />
    </div>
      </Dialog>
    </div>
  );
}


// export default function PdfView() {


//   return (

//   );
// }