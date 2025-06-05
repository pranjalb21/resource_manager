import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constants/constants";

type DataProps = {
    engineer: string;
    project: string;
    name: string;
    description: string;
    allocationPercentage: number;
    startDate: string;
    endDate?: string;
    role: string;
    status: "active";
};
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
export const fetchAssignmentsByProjectId = createAsyncThunk(
    "assignment/fetchAssignmentsByProjectId",
    async (projectId: string | null, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                return rejectWithValue("No auth token found");
            }
            const response = await axios.get(
                `${baseUrl}/assignments/project/${projectId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(response.data.data);

            // console.log("Assignments loaded successfully:", response.data.data);

            return response.data.data;
        } catch (error) {
            return rejectWithValue("Failed to load assignments");
        }
    }
);

export const addAssignment = createAsyncThunk(
    "assignment/addAssignment",
    async (assignmentData: DataProps, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                return rejectWithValue("No auth token found");
            }
            const response = await axios.post(
                `${baseUrl}/assignments`,
                assignmentData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            // console.log("Assignments added successfully:", response.data.data);

            return response.data.data;
        } catch (error) {
            return rejectWithValue("Failed to add assignment");
        }
    }
);

export const fetchAssignmentsByEngineerId = createAsyncThunk(
    "assignment/fetchAssignmentsByEngineerId",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                return rejectWithValue("No auth token found");
            }
            const response = await axios.get(
                `${baseUrl}/assignments/engineer/me`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            // console.log("Assignments added successfully:", response.data.data);

            return response.data.data;
        } catch (error) {
            return rejectWithValue("Failed to add assignment");
        }
    }
);
