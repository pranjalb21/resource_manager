import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constants/constants";
import { loadUserByToken, loginUser, logoutUser } from "./auth.apis";

export type User = {
    _id: string | null;
    name: string;
    email: string;
    role: string;
    seniority: string;
    department: string;
    maxCapacity: number;
    skills: string[];
    createdAt: string;
    updatedAt: string;
};
type LoadingStatus = true | false;

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    loadingStatus: LoadingStatus;
    errors: string | null;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    loadingStatus: false,
    errors: null,
};

interface PayloadAction<T> {
    type: string;
    payload: T;
}

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loadingStatus = true;
            state.isAuthenticated = false;
            state.user = initialState.user;
            state.errors = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loadingStatus = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.errors = null;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loadingStatus = false;
            state.isAuthenticated = false;
            state.user = initialState.user;
            state.errors =
                (action.payload as string) ||
                action.error.message ||
                "Login failed";
        });
        builder.addCase(loadUserByToken.pending, (state) => {
            state.loadingStatus = true;
            state.isAuthenticated = false;
            state.user = initialState.user;
            state.errors = null;
        });
        builder.addCase(loadUserByToken.fulfilled, (state, action) => {
            state.loadingStatus = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.errors = null;
        });
        builder.addCase(loadUserByToken.rejected, (state, action) => {
            state.loadingStatus = false;
            state.isAuthenticated = false;
            state.user = initialState.user;
            state.errors =
                (action.payload as string) ||
                action.error.message ||
                "Failed to load user";
        });
        builder.addCase(logoutUser.pending, (state) => {
            state.loadingStatus = true;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = initialState.user;
            state.isAuthenticated = false;
            state.loadingStatus = false;
            state.errors = null;
            localStorage.removeItem("authToken");
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loadingStatus = false;
            state.errors =
                (action.payload as string) ||
                action.error.message ||
                "Logout failed";
        });
    },
});

export default userSlice.reducer;
