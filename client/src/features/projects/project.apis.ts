import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constants/constants";

type FormDataType = {
    name: string;
    startDate: string;
    status: string;
    teamSize: number;
    description?: string;
    requiredSkills?: string[];
    endDate?: string;
};
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

export const addProject = createAsyncThunk(
    "project/addProject",
    async (projectData: FormDataType, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${baseUrl}/projects`,
                projectData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`,
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue("Failed to add project");
        }
    }
);

export const fetchProjectById = createAsyncThunk(
    "project/fetchProjectById",
    async (projectId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseUrl}/projects/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`,
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue("Failed to fetch project");
        }
    }
);
