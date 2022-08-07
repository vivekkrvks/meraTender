import React, { useImperativeHandle } from "react";


import {  Snackbar } from "@mui/material";
import { useState } from "react";
import { forwardRef } from "react";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  

const MySnackbar = forwardRef((props, ref) => {
	const [data, setData] = useState({ message: "", variant: "success" });
	const [open, setOpen] = useState(false);
	useImperativeHandle(ref, () => ({
		handleSnack(a) {
			setData(a);

			setOpen(!open);
		},
	}));

	return (
		<Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={data.variant} sx={{ width: '100%' }}>
          {data.message}
        </Alert>
      </Snackbar>
	);
});

export default MySnackbar;
