import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const UserURL = "https://jsonplaceholder.typicode.com/users"

const initialState = []

export const fetchUsers = createAsyncThunk("users/fetchUsers", async() => {
    const response = await axios.get(UserURL)
    return response.data
})

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers : {

    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload
            })
        }
}) 

export const selectAllUsers = (state) => state.users

export default usersSlice.reducer;