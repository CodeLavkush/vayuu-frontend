import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    data: null,
    message: '',
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action)=>{
            state.status = true
            state.data = action.payload
        },
        logout: (state)=>{
            state.status = false
            state.data = null
        },
        setMessage: (state, action)=>{
            state.message = action.payload
        }
    }
})

export const { login, logout, setMessage } = authSlice.actions

export default authSlice.reducer