import { createSlice } from "@reduxjs/toolkit";
import { loadProjects } from "./project.apis";

export type ProjectStatus = "planning" | "active" | "completed";

export interface Project {
    _id: string;
    name: string;
    description?: string;
    startDate: string; // ISO string
    endDate?: string; // ISO string
    requiredSkills: string[];
    teamSize: number;
    status: ProjectStatus;
    managerId: string;
}

interface ProjectState {
    project: Project | {};
    projects: Project[];
    loadingProjects: boolean;
    errors: string | null;
}

const initialState: ProjectState = {
    project: {},
    projects: [],
    loadingProjects: false,
    errors: null,
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadProjects.pending, (state) => {
            state.loadingProjects = true;
        });
        builder.addCase(loadProjects.fulfilled, (state, action) => {
            state.loadingProjects = false;
            state.projects = action.payload;
        });
        builder.addCase(loadProjects.rejected, (state) => {
            state.projects = [];
            state.loadingProjects = false;
            state.errors = "Failed to load projects";
        });
    },
});

export default projectSlice.reducer;
