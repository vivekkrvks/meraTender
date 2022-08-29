import React, { useState } from 'react';
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
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const downloadImage = (url) => {
    saveAs(url,`meraTender_${props.fileName}`) // Put your image url here.
  }
  const download = e => {
    console.log(e.target.href);
    fetch(e.target.href, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
            <a
        href="https://upload.wikimedia.org/wikipedia/en/6/6b/Hello_Web_Series_%28Wordmark%29_Logo.png"
        download
        onClick={e => download(e)}
      >
        <i className="fa fa-download" />
        download
      </a>
          <Button onClick = {() => downloadImage(props.fileUrl)} variant="contained" color="primary">
             Download
            </Button>

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