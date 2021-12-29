import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import React from "react";

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

const App = () => {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}>
        </Route>        
        <Route path="/Product/category" element={<Product/>}>
        </Route>
        <Route path="/Product/:id" element={<Product/>}>
        </Route>
        <Route path="/ProductList" element={<ProductList/>}>
        </Route>
        <Route path="/Cart" element={<Cart/>}>
        </Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>        
        <Route path="/Register" element={user ? <Navigate to="/Login"/>: <Register/>}>
        </Route>
        </Routes>
    </Router>
  )

};

export default App;