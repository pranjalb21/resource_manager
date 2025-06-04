import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                Welcome to RM Application
            </h2>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
