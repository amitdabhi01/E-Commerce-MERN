import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComponent from "../Components/NavbarComponent";

import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import ProductDetails from "../Pages/ProductDetails.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
