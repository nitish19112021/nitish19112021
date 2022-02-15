import { createSlice } from "@reduxjs/toolkit";
const updateUserSlice = createSlice({
    name:'update',
    initialState:{
        currentUser:null,
        isFetching:false,
        error:false,
    },
    reducers:{
        updateUserStart:(state)=>{
            state.isFetching = true;
        },
        updateUserSuccess:(state,action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        updateUserFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const {updateUserStart, updateUserSuccess, updateUserFailure} = updateUserSlice.actions;
export default updateUserSlice.reducer;