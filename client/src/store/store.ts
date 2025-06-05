import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/auth.slice";
import projectSlice from "../features/projects/project.slice";
import assignmentSlice from "../features/assignments/assignment.slice";
import userSlice from "../features/users/user.slice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        projects: projectSlice,
        assignments: assignmentSlice,
        users: userSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
