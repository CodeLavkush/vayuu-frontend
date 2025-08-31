import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    session: null,
    status: false,
    data: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action)=>{
            state.session = action.payload
            state.data = action.payload.user
            state.status = true
        },
        logout: (state)=>{
            state.session = null
            state.status = false
            state.data = null
        },
    }
})

export const { login, logout, setMessage } = authSlice.actions

export default authSlice.reducer