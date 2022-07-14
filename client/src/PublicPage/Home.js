import React from "react";
import Crausal from "./Component/Crausal";


import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

export default function Home() {
	
	return (
	<>
    <div>
        <Crausal /> 
    </div>
    </>
		
	
	);
}
