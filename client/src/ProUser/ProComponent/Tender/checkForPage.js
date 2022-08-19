import React, { useState, useEffect,useContext } from "react";


import { Navigate } from "react-router-dom";

import { MainContext } from "../../../Components/Context/MainContext";


function CheckPage({from}) {
	const { state } = useContext(MainContext);
  
  const [redirectToPricing, setRedirectToPricing] = useState(false)
  const [redirectToMainApp, setRedirectToMainApp] = useState(false)
  const [redirectToLogin, setRedirectToLogin] = useState(false)

  const checkForPage = () => {
    let isSubscribed= true
    if(isSubscribed){
      if (state.isAuthenticated) {  
        if(state.isProUser){
            if(from !== "MainApp")
          {setRedirectToMainApp(true)}
        }else
        {if(from!== "Pricing")
       { setRedirectToPricing(true) } }
    }else{
        if(from !== "Login")
        {setRedirectToLogin(true)}
    }
    return () => {
      isSubscribed = false;
    };
  }
  
  }
    useEffect(() => {   
        async function fetchData() {
            // You can await here
            await checkForPage()    

            // ...
          }
          fetchData();   
  
    }, [state.designation,state.isAuthenticated])


  if(redirectToPricing){
    if(from!== "Pricing")
    {return <Navigate to="/pricing"/>}

 }
  if(redirectToMainApp){
    if(from !== "MainApp")
    {return <Navigate to="/MainApp"/>}

 }
  if(redirectToLogin){
    if(from !== "Login")
    {return <Navigate to="/"/>}

 }


  return (
   <></>
  );
}

export default CheckPage;
