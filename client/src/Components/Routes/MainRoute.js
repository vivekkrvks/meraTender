import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import { MainContext } from "../Context/MainContext";
import AddCategory from "../../Protected/Addition/Category/AddCategory"
import AddBlog from "../../Protected/Addition/Blog/AddBlog"
import AddDepartment from "../../Protected/Addition/Department/AddDepartment"
import Home from "../../PublicPage/Home"

import Dashboard from "../../Protected/MyDashboard/Dashboard";
import App from "../../App";
import LocationMaster from "../../Protected/DropDown/LocationMaster";
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
              <Route  path="/AddBlog" element={
          <PrivateRoute children={<AddBlog />} />        
        } />
        <Route  path="/AddCategory" element={
          <PrivateRoute children={<AddCategory />} />     
        } />
        <Route  path="/AddDepartment" element={
          <PrivateRoute children={<AddDepartment />} />     
        } />

  
        <Route  path="/LocationMaster" element={
        <PrivateRoute children={<LocationMaster />} />         
        } />
        {/* public */}

        
    	</Routes>
	);
}


