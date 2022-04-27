import { createSlice } from "@reduxjs/toolkit";


export const todoDetailSlice = createSlice({
    name: 'todoDetail',
    initialState: {
        value: false,
    },
    reducers:{
        openTodoDetail: state =>{
            state.value = true
        },
        closeTodoDetail: state =>{
            state.value = false
        },
    }
    
})


export const {openTodoDetail, closeTodoDetail} = todoDetailSlice.actions
export const selecTodoDetail = (state) => state.todoDetail.value
export default todoDetailSlice.reducer
