import React, { useState, useEffect,useContext, useRef } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { Navigate } from "react-router-dom";

import Box from '@mui/material/Box';

import PubAppBarCom from "./PubAppBar"
import PubDrawerCom from "./PubDrawer"
import { MainContext } from "../../../Components/Context/MainContext";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({compo}) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
	const { state, dispatch } = useContext(MainContext);

  const [redirectToLogin,setRedirectToLogin] = useState(false);

  const checkForAuth = () => {
    let isSubscribed= true
    if(isSubscribed){
      console.log(state)
      if (!(state.isAuthenticated)) {  
        // setRedirectToLogin(true)  
    }
    return () => {
      isSubscribed = false;
    };
  }
  isSubscribed = false;
  
  }
    useEffect( async() => {
     await checkForAuth()
  
    }, [state.designation,state.isAuthenticated])

    if(redirectToLogin){
      return <Navigate to="/"/>
  
   }
  return (
    <Box sx={{ display: 'flex' }}>
      <PubAppBarCom 
      handleDrawerOpen={handleDrawerOpen}
      open={open}
      />
    
 <PubDrawerCom 
      open={open}
      handleDrawerClose={handleDrawerClose}
      handleDrawerOpen={handleDrawerOpen}

 />
      <Main open={open}>
        <DrawerHeader />
        <div
        style={{marginLeft:"240px"}}
        >
        {compo}
        
        </div>
      </Main>
    </Box>
  );
}

