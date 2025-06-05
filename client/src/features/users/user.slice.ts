import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../auth/auth.slice";
import { addUser, loadAllUsers } from "./user.api";

interface UsersState {
    availableUsers: User[];
    userLoading: boolean;
    userError: string | null;
}

const initialState: UsersState = {
    availableUsers: [],
    userLoading: false,
    userError: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // Add your synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllUsers.pending, (state) => {
                state.userLoading = true;
                state.userError = null;
            })
            .addCase(loadAllUsers.fulfilled, (state, action) => {
                state.userLoading = false;
                state.availableUsers = action.payload;
            })
            .addCase(loadAllUsers.rejected, (state, action) => {
                state.userLoading = false;
                state.userError =
                    action.error.message || "Failed to fetch users";
            })
            .addCase(addUser.pending, (state) => {
                state.userLoading = true;
                state.userError = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userError = null;
                state.availableUsers.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.userLoading = false;
                state.userError =
                    (action.payload as string) ||
                    "Error occured while adding user.";
            });
    },
});

export default userSlice.reducer;
