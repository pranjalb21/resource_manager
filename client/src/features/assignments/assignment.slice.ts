import { createSlice } from "@reduxjs/toolkit";
import {
    addAssignment,
    fetchAssignmentsByEngineerId,
    fetchAssignmentsByProjectId,
    loadAssignments,
} from "./assignment.api";

export type Assignment = {
    _id?: string;
    engineer: string;
    project: string;
    name: string;
    description: string;
    allocationPercentage: number;
    startDate: string; // ISO string
    endDate?: string; // ISO string or undefined
    role: "Developer" | "Tech Lead" | "Manager" | "QA" | "Other";
    status: "active" | "completed" | "on hold";
    createdAt?: string;
    updatedAt?: string;
};

interface AssignmentsState {
    assignments: Assignment[];
    loadingAssignment: boolean;
    errorAssignment: string | null;
}

const initialState: AssignmentsState = {
    assignments: [],
    loadingAssignment: false,
    errorAssignment: null,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadAssignments.pending, (state) => {
            state.loadingAssignment = true;
            state.errorAssignment = null;
        });
        builder.addCase(loadAssignments.fulfilled, (state, action) => {
            state.loadingAssignment = false;
            state.assignments = action.payload;
            state.errorAssignment = null;
        });
        builder.addCase(loadAssignments.rejected, (state, action) => {
            state.loadingAssignment = false;
            state.assignments = [];
            state.errorAssignment =
                (action.payload as string) || "Failed to load assignments";
        });
        builder.addCase(fetchAssignmentsByEngineerId.pending, (state) => {
            state.loadingAssignment = true;
            state.errorAssignment = null;
        });
        builder.addCase(
            fetchAssignmentsByEngineerId.fulfilled,
            (state, action) => {
                state.loadingAssignment = false;
                state.assignments = action.payload;
                state.errorAssignment = null;
            }
        );
        builder.addCase(
            fetchAssignmentsByEngineerId.rejected,
            (state, action) => {
                state.loadingAssignment = false;
                state.assignments = [];
                state.errorAssignment =
                    (action.payload as string) || "Failed to load assignments";
            }
        );
        builder.addCase(addAssignment.pending, (state) => {
            state.loadingAssignment = true;
            state.errorAssignment = null;
        });
        builder.addCase(addAssignment.fulfilled, (state, action) => {
            state.loadingAssignment = false;
            state.assignments.push(action.payload);
            state.errorAssignment = null;
        });
        builder.addCase(addAssignment.rejected, (state, action) => {
            state.loadingAssignment = false;
            state.errorAssignment =
                (action.payload as string) || "Failed to add assignment";
        });
        builder.addCase(fetchAssignmentsByProjectId.pending, (state) => {
            state.loadingAssignment = true;
            state.errorAssignment = null;
        });
        builder.addCase(
            fetchAssignmentsByProjectId.fulfilled,
            (state, action) => {
                state.loadingAssignment = false;
                state.assignments = action.payload;
                state.errorAssignment = null;
            }
        );
        builder.addCase(
            fetchAssignmentsByProjectId.rejected,
            (state, action) => {
                state.loadingAssignment = false;
                state.errorAssignment =
                    (action.payload as string) || "Failed to add assignment";
                state.assignments = [];
            }
        );
    },
});

export default assignmentsSlice.reducer;
