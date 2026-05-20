import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComponent from "../Components/NavbarComponent";

import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import ProductDetails from "../Pages/ProductDetails.jsx";
import ProtectedRoute from "../Components/ProtectedRoutes.jsx";
import AdminDashboard from "../Pages/AdminDashboard.jsx";
import AddProduct from "../Pages/AddProduct.jsx";
import UpdateProduct from "../Pages/UpdateProduct.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="add"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
