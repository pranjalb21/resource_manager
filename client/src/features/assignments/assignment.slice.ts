import { createSlice } from "@reduxjs/toolkit";
import { loadAssignments } from "./assignment.api";

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
    },
});

export default assignmentsSlice.reducer;
