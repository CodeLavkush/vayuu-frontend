import { createSlice } from "@reduxjs/toolkit";

export const createEntitySlice = (name)=>{
    const initialState = {
        data: [],
    }

    const slice = createSlice({
        name,
        initialState,
        reducers: {
            setData: (state, action)=>{
                state.data = action.payload
            },
            addData: (state, action)=>{
                state.data.push(action.payload)
            },
            updateData: (state, action)=>{
                const idx = state.data.findIndex((i)=> i.id === action.payload.id)
                if(idx >= 0){
                    state.data[idx] = action.payload
                }
            },
            deleteData: (state, action)=>{
                state.data = state.data.filter((i)=> i.id !== action.payload.id)
            }
        }
    })

    return slice
}