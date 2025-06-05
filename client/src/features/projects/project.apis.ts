import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constants/constants";

export const loadProjects = createAsyncThunk(
    "project/loadProjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}/projects`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                    )}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue("Failed to load projects");
        }
    }
);
