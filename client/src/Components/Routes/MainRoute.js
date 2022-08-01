import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import { MainContext } from "../Context/MainContext";
//Addition
import AddTender from "../../Protected/Addition/Tender/AddTender"
import AddDepartment from "../../Protected/Addition/Department/AddDepartment"
// Addition -> Location
import AddState from "../../Protected/Addition/Location/AddState"
import AddDistrict from "../../Protected/Addition/Location/AddDistrict"
// Report
import AllUser from "../../Protected/Report/AllUser"

import CommonPubDash from "../Navigation/PublicAppBarNavBar/CommonPubDash"


import Dashboard from "../../Protected/MyDashboard/Dashboard";
import App from "../../App";
// public
import LoginMobile from "../../ProUser/LoginMobile";
import LoginOtp from "../../ProUser/LoginOtp";
import Pricing from "../../ProUser/Pricing";
import MainApp from "../../ProUser/MainApp";


const PrivateRoute = ({ children }) => {
	const { state } = useContext(MainContext);
	let isAuthenticated = state.isAuthenticated && (state.designation.id === "admin" || state.designation.id === "supervisor" ||  state.designation.id === "fieldPartner") ? true : false;
	if(isAuthenticated){
   return children
  } else {
   return children

    // return <Login />
  }
};


export default function MainRoute() {
	return (
		<Routes>
      	<Route path="/" element={<App />}/>
        <Route  path="/login" element={<Login />} />
  
        <Route  path="/Dashboard" element={
          <PrivateRoute children={<Dashboard />} />        
        } />
              <Route  path="/AddTender" element={
          <PrivateRoute children={<AddTender />} />        
        } />
              <Route  path="/AddState" element={
          <PrivateRoute children={<AddState />} />        
        } />
              <Route  path="/AddDistrict" element={
          <PrivateRoute children={<AddDistrict />} />        
        } />
              <Route  path="/AllUser" element={
          <PrivateRoute children={<AllUser />} />        
        } />

        <Route  path="/AddDepartment" element={
          <PrivateRoute children={<AddDepartment />} />     
        } />
        <Route  path="/CommonPubDash" element={
          <PrivateRoute children={<CommonPubDash />} />     
        } />

        {/* public */}
        <Route  path="/LoginMobile" element={
          <PrivateRoute children={<LoginMobile />} />     
        } /> 
        <Route  path="/LoginOtp" element={
          <PrivateRoute children={<LoginOtp />} />     
        } /> 
        <Route  path="/Pricing" element={
          <PrivateRoute children={<Pricing />} />     
        } /> 
        <Route  path="/MainApp" element={
          <PrivateRoute children={<MainApp />} />     
        } /> 

        
    	</Routes>
	);
}


