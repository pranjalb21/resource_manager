import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    // const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { loadingStatus, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );
    useEffect(() => {
        if (!loadingStatus && isAuthenticated) {
            // If the user is already authenticated, redirect to the dashboard
            navigate("/", { replace: true });
        }
    }, [loadingStatus, isAuthenticated, navigate]);

    if (!loadingStatus && !isAuthenticated) {
        // If the user is not authenticated, stay on the login page
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                    Welcome to RM Application
                </h2>
                <LoginForm />
            </div>
        );
    }
};

export default LoginPage;
