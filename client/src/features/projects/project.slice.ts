import { createSlice } from "@reduxjs/toolkit";
import { addProject, fetchProjectById, loadProjects } from "./project.apis";

export type ProjectStatus = "planning" | "active" | "completed";

export interface Project {
    _id: string;
    name: string;
    description?: string;
    startDate: string; // ISO string
    endDate?: string; // ISO string
    requiredSkills: string[];
    teamSize: number;
    status: string;
    managerId: string;
}

interface ProjectState {
    project: Project | {};
    projects: Project[];
    loadingProjects: boolean;
    errorsProjects: string | null;
}

const initialState: ProjectState = {
    project: {},
    projects: [],
    loadingProjects: false,
    errorsProjects: null,
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
            state.errorsProjects = "Failed to load projects";
        });
        builder.addCase(addProject.pending, (state) => {
            state.loadingProjects = true;
            state.errorsProjects = null;
        });
        builder.addCase(addProject.fulfilled, (state, action) => {
            state.loadingProjects = false;
            state.projects.push(action.payload);
            state.errorsProjects = null;
        });
        builder.addCase(addProject.rejected, (state) => {
            state.loadingProjects = false;
            state.errorsProjects = "Failed to load projects";
        });
        builder.addCase(fetchProjectById.pending, (state) => {
            state.loadingProjects = false;
            state.errorsProjects = null;
        });
        builder.addCase(fetchProjectById.fulfilled, (state, action) => {
            state.loadingProjects = false;
            state.project = action.payload;
            state.errorsProjects = null;
        });
        builder.addCase(fetchProjectById.rejected, (state) => {
            state.loadingProjects = false;
            state.errorsProjects = "Failed to load projects";
        });
    },
});

export default projectSlice.reducer;
