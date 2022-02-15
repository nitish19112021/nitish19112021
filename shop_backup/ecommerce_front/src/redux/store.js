import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartRedux";
import useReducer  from "./userRedux";

export default configureStore({
    reducer:{
        cart:cartReducer,
        user:useReducer
    }
})