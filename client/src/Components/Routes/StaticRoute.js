import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// public
import About from "../../ProUser/StaticPage/AboutUs";


export default function StaticRoute() {
	return (
      	<Route path="/about" element={<About />}/>
         
	);
}


