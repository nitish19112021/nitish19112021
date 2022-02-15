import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import SuccessMess from "./pages/SuccessMess"
import ResetUser from "./pages/ResetUser";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyForgetPassword from "./pages/VerifyForgetPassword"
import React from "react";
import Stripe from "./pages/Stripe";
//stripe



import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  //const user = useSelector(state=>state.user.currentUser);
   const user = false;
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
        <Route path="/register" element={<Register/>}>
        </Route>
        <Route path="/successmess" element={<SuccessMess/>}>
        </Route>
        <Route path="/resetUser" element={<ResetUser/>}>
        </Route>
        <Route path="/forgetPass" element={<ForgetPassword/>}>
        </Route>
        <Route path="/verifypass" element={<VerifyForgetPassword/>}>
        </Route>
        <Route path="/Stripe" element={<Stripe/>}>
        </Route>
        </Routes>
    </Router>
  )

};

export default App;