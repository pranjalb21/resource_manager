import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constants/constants";

export const loadAssignments = createAsyncThunk(
    "assignment/loadAssignments",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                return rejectWithValue("No auth token found");
            }
            const response = await axios.get(`${baseUrl}/assignments`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log("Assignments loaded successfully:", response.data.data);

            return response.data.data;
        } catch (error) {
            return rejectWithValue("Failed to load assignments");
        }
    }
);
