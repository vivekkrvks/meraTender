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



import Home from "../../PublicPage/Home"

import Dashboard from "../../Protected/MyDashboard/Dashboard";
import App from "../../App";
// public

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
const AdminRoute = ({ children }) => {
	const { state } = useContext(MainContext);
	let isAuthenticated = state.isAuthenticated && (state.designation.id === "admin" ) ? true : false;
	if(isAuthenticated){
   return children
  } else {
    return <Dashboard />
  }
};

export default function MainRoute() {
	return (
		<Routes>
      	<Route path="/" element={<App />}/>
      	<Route path="/home" element={<Home />}/>
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

  

        {/* public */}

        
    	</Routes>
	);
}


