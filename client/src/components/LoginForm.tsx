import React from "react";
import { useForm } from "react-hook-form";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/auth.apis";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
    email: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const onSubmit = (data: LoginFormInputs) => {
        // You can add further validation or authentication logic here
        dispatch(loginUser(data))
            .unwrap()
            .then(() => {
                navigate("/", { replace: true });
                console.log("Login successful, redirecting to dashboard");
            })
            .catch((error: any) => {
                console.error("Login failed:", error);
                // Handle login failure, e.g., show an error message
            });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        * {errors.email.message}
                    </p>
                )}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "Password must be at least 5 characters",
                        },
                    })}
                    autoComplete="current-password"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        * {errors.password.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Login
            </button>
            <p className="pt-4 text-center">
                Having queries related to account?
                <br />
                <span className="text-blue-600 hover:underline">
                    Contact your administrator.
                </span>
            </p>
        </form>
    );
};

export default LoginForm;
