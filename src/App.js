import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import React from "react";
import { useSelector } from "react-redux";
import ThankYou from "./page/ThankYou";
import Home from "./page/Home";
import Login from "./page/Login";

const App = () => {
  
  const user = useSelector((state) => state.user) || {};

  function PrivateOutlet() {
    return user.name ? <Outlet /> : <Navigate to="/" />;
  }
  return (
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route element={<PrivateOutlet />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/question/:id" element={<Home />}></Route>
      <Route path="/thankyou" element={<ThankYou />}></Route>
    </Routes>
  );
};

export default App;
