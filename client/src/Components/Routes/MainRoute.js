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
import AddPartner from "../../Protected/Addition/Partner/AddPartner"
// Report
import AllUser from "../../Protected/Report/AllUser"
import AllTransaction from "../../ProUser/StaticPage/AllTransaction"

import CommonPubDash from "../Navigation/PublicAppBarNavBar/CommonPubDash"


import Dashboard from "../../Protected/MyDashboard/Dashboard";
import App from "../../App";
// public
import LoginMobile from "../../ProUser/LoginMobile";
import LoginOtp from "../../ProUser/LoginOtp";
import Pricing from "../../ProUser/Pricing";
import MainApp from "../../ProUser/MainApp";
import StaticRoute from "./StaticRoute";
import About from "../../ProUser/StaticPage/AboutUs";
import PrivacyPolicy from "../../ProUser/StaticPage/PrivacyPolicy";
import TermAndCondition from "../../ProUser/StaticPage/TermAndCondition";
import RefundPolicy from "../../ProUser/StaticPage/RefundPolicy";
import PricingContent from "../../ProUser/StaticPage/ProPricing";
import ProContact from "../../ProUser/StaticPage/ContactUs";
import UserProfile from "../../ProUser/Profile/UserProfile";
import PaymentVerify from "../../ProUser/PaymentVerify";


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
	let isAuthenticated = state.isAuthenticated && (state.designation.id === "admin" || state.designation.id === "supervisor" ||  state.designation.id === "fieldPartner") ? true : false;
	if(isAuthenticated){
   return children
  } else {

    return <Login />
  }
};


export default function MainRoute() {
	return (
		<Routes>
      	<Route path="/" element={<App />}/>
        <Route  path="/login" element={<Login />} />
  
        <Route  path="/Dashboard" element={
          <AdminRoute children={<Dashboard />} />        
        } />
              <Route  path="/AddTender" element={
          <AdminRoute children={<AddTender />} />        
        } />
              <Route  path="/AddState" element={
          <AdminRoute children={<AddState />} />        
        } />
              <Route  path="/AddDistrict" element={
          <AdminRoute children={<AddDistrict />} />        
        } />
              <Route  path="/AddPartner" element={
          <AdminRoute children={<AddPartner />} />        
        } />
              <Route  path="/AllUser" element={
          <AdminRoute children={<AllUser />} />        
        } />
              <Route  path="/transaction" element={
          <AdminRoute children={<AllTransaction />} />        
        } />

        <Route  path="/AddDepartment" element={
          <AdminRoute children={<AddDepartment />} />     
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
           <PrivateRoute children={<MainApp /> } />   
         
        } /> 
      	<Route path="/about" element={<About />}/>
      	<Route path="/PrivacyPolicy" element={<PrivacyPolicy />}/>
      	<Route path="/TermAndCondition" element={<TermAndCondition />}/>
      	<Route path="/RefundPolicy" element={<RefundPolicy />}/>
      	<Route path="/PricingContent" element={<PricingContent />}/>
      	<Route path="/ProContact" element={<ProContact />}/>
      	<Route path="/UserProfile" element={<UserProfile />}/>
			<Route path="/paymentverify/:paymentCompany/:status/:paymentId" element={<PaymentVerify/>} />

    	</Routes>
	);
}


