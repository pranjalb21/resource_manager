import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants/constants";
import axios from "axios";
import type { User } from "./auth.slice";

export const loginUser = createAsyncThunk<
    User,
    { email: string; password: string }
>("auth/login", async (credentials) => {
    try {
        const response = await axios.post<{ data: User; token: string }>(
            `${baseUrl}/auth/login`,
            credentials
        );
        localStorage.setItem("authToken", response.data.token);
        return response.data.data;
    } catch (error: any) {
        const message =
            error.response?.data?.error || error.message || "Login failed";
        return Promise.reject(message);
    }
});

export const loadUserByToken = createAsyncThunk(
    "auth/loadUserByToken",
    async (_, { rejectWithValue }) => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            localStorage.removeItem("authToken");
            return rejectWithValue("No auth token found");
        }
        try {
            const response = await axios.get(`${baseUrl}/users/profile/me`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            return response.data.data;
        } catch (error: any) {
            localStorage.removeItem("authToken");
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to load user";
            return rejectWithValue(message);
        }
    }
);


export const logoutUser = createAsyncThunk("auth/logout", async () => {
    try {
        await axios.post(
            `${baseUrl}/auth/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                    )}`,
                },
            }
        );
    } catch (error: any) {
        const message =
            error.response?.data?.message || error.message || "Logout failed";
        return Promise.reject(message);
    }
    return null; // No payload needed for logout
});
