import React, { useContext, useState } from "react";
import { Routes as AppRoutes, Route } from "react-router";
import { contextData } from "../contextData/ContextData";
import Home from "../pages/home/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import NoUser from "../pages/noUser/NoUser";
const Routes = () => {
  const ctxData = useContext(contextData)

  return (
    <>
      <AppRoutes>
        <Route path="/home" element={ctxData !== 'noUser' ? <Home /> : <NoUser />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </AppRoutes>
    </>
  );
};

export default Routes;