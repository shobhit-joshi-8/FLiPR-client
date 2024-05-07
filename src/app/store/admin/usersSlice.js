import { API_ROUTES } from "src/app/constant/apiRoutes";
import { APIRequest } from "src/app/utils/APIRequest";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getUsers = createAsyncThunk('Users/getUsers', async () => await APIRequest.get(API_ROUTES.fetchAllUsers))

export const deleteUser = createAsyncThunk('User/deleteUser', async (id, { dispatch }) => {
    try {
        const response = await APIRequest.remove(`${API_ROUTES.deleteuser}/${id}`)
    } catch (error) {
        console.log("🚀 ~ deleteUser ~ error:", error)
        return { error: true }
    }
})
export const addUser = createAsyncThunk('Users/addUser', async (data, { dispatch }) => {
    try {
        const response = await APIRequest.post(API_ROUTES.addUser, data)
        return response
    } catch (error) {
        console.log("🚀 ~ addUser ~ error:", error)
        return { error: true, message: error?.error }
    }
})
export const changePassword = createAsyncThunk('User/deleteUser', async ({ id, data }, { dispatch }) => {
    try {
        const response = await APIRequest.patch(`${API_ROUTES.changePassword}/${id}`, data)
        console.log("🚀 ~ changePassword ~ response:", response)
        dispatch(getUsers())
        return response
    } catch (error) {
        console.log("🚀 ~ changePassword ~ error:", error)
        return { error: true }
    }
})

const initialState = {
    users: [],
    loading: {
        usersLoading: false
    }
}
const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, { payload }) => {
                state.loading.usersLoading = true
            })
            .addCase(getUsers.fulfilled, (state, { payload }) => {
                state.users = payload.result
                state.loading.usersLoading = false
            })
    }
})

export const { } = userSlice.actions
export default userSlice.reducer