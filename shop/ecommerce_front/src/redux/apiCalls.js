import { publicRequest  } from "../requestMethods"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { registerFailure, registerSuccess, registerStart } from "./registerRedux"
import {updateUserStart, updateUserSuccess, updateUserFailure} from "./updateUserRedux";


export const login = async (dispatch,user)=>{

    dispatch(loginStart());
    try{
        const res = await publicRequest.post('/auth/login',user)
        dispatch(loginSuccess(res.data))    
        console.log("login",res)
        
    }
    catch(err){
        dispatch(loginFailure());
    }
}


export const register = async (dispatch, register) =>{
    dispatch(registerStart())
    try{
        const res = await publicRequest.post("/auth/register", register)
        dispatch(registerSuccess(res.data))       
    }
    catch(err){
        dispatch(registerFailure())
    }
}


export const update = async (dispatch, update)=>{
    
    dispatch(updateUserStart())
    try{        
        const res = await publicRequest.post("/user/updateUser", update);
        dispatch(updateUserSuccess(res.data))
        console.log(res)
    }catch(err){
        dispatch(updateUserFailure())
    }
}