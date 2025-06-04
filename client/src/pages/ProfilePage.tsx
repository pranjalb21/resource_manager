import React from "react";
import ProfileForm from "../components/ProfileForm";

const ProfilePage: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 mt-7">
                Profile Details
            </h1>
            <ProfileForm
                initialValues={{
                    name: "John Doe",
                    email: "test@email.com",
                    role: "engineer",
                    skills: [{ value: "JavaScript" }, { value: "React" }],
                    seniority: "mid",
                    maxCapacity: 50,
                    department: "Tech Team",
                    password:
                        "$2b$10$lIG8yf0W85WJ7080jJgdAuhZhzGKspxEw5gFRXZDF/l0keyu6HBtq",
                }}
                loggedInUserRole="engineer"
            />
        </div>
    );
};

export default ProfilePage;
