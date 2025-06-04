import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type User = {
    _id: string | null;
    name: string;
    email: string;
    role: string;
    seniority: string;
    department: string;
    maxCapacity: number;
    skills: string[];
    createdAt: string;
    updatedAt: string;
};
type LoadingStatus = true | false;

interface UserState {
    user: User;
    users: User[];
    isAuthenticated: boolean;
    loadingStatus: LoadingStatus;
    errors: string | null;
}

const initialState: UserState = {
    user: {
        _id: null,
        email: "",
        name: "",
        role: "",
        seniority: "",
        department: "",
        maxCapacity: 0,
        skills: [],
        createdAt: "",
        updatedAt: "",
    },
    users: [],
    isAuthenticated: false,
    loadingStatus: false,
    errors: null,
};

interface PayloadAction<T> {
    type: string;
    payload: T;
}

export const loginUser = createAsyncThunk<
    User,
    { email: string; password: string }
>("user/login", async (credentials) => {
    const response = await axios.post<User>("/api/users/login", credentials);
    if (response.status !== 200) {
        throw new Error("Login failed");
    }
    return response.data;
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loadingStatus = true;
            state.isAuthenticated = false;
            state.user = initialState.user;
            state.errors = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loadingStatus = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.errors = null;
        });
    },
});

export default userSlice.reducer;
