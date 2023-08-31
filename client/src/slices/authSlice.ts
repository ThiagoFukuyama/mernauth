import { createSlice } from "@reduxjs/toolkit"

const initialUserInfo = localStorage.getItem("userInfo")

const initialState = {
    userInfo: initialUserInfo ? JSON.parse(initialUserInfo) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        clearCredentials: (state) => {
            state.userInfo = null
            localStorage.removeItem("userInfo")
        },
    },
})

export const { setCredentials, clearCredentials } = authSlice.actions

export default authSlice.reducer
