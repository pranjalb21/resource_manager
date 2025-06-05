import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constants/constants";

export const loadAllUsers = createAsyncThunk(
    "user/loadAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                return rejectWithValue("No auth token found");
            }
            const response = await axios.get(`${baseUrl}/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log("Users loaded successfully:", response.data.data);

            return response.data.data;
        } catch (error) {
            return rejectWithValue("Failed to load users");
        }
    }
);
export const addUser = createAsyncThunk(
    "user/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                return rejectWithValue("No auth token found");
            }
            const response = await axios.post(
                `${baseUrl}/auth/register`,
                userData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            // console.log("Users loaded successfully:", response.data.data);

            return response.data.data;
        } catch (error) {
            return rejectWithValue("Failed to load users");
        }
    }
);
