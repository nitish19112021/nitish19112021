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
        <Route path="/products/:categroy" element={<ProductList/>}>
        </Route>        
        <Route path="/product/:id" element={<Product/>}>
        </Route>        
        <Route path="/cart" element={<Cart/>}>
        </Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>        
        <Route path="/register" element={user ? <Navigate to="/"/>: <Register/>}>
        </Route>
        </Routes>
    </Router>
  )

};

export default App;