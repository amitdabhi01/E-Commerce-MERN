import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComponent from "../Components/NavbarComponent";

import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/login" element={<Login/>}></Route>

        <Route path="/login"></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
