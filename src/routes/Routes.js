import React from "react";
import { Routes as AppRoutes, Route } from "react-router";
import Home from "../pages/home/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
const Routes = () => {
  return (
    <>
      <AppRoutes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </AppRoutes>
    </>
  );
};

export default Routes;
