import { Route, Routes } from "react-router-dom";

import React from "react";
import Home from "./Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/question/:id" element={<Home/>}></Route>
    </Routes>
  );
};

export default App;
