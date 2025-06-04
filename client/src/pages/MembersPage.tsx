import React, { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import RegisterForm from "../components/RegisterForm";

// Dummy users data for demonstration. Replace with actual data fetching.
const users = [
    {
        _id: "1",
        name: "Alice Smith",
        email: "alice@example.com",
        role: "Developer",
        maxCapacity: 100,
        capacityOccupied: 30,
    },
    {
        _id: "2",
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "Designer",
        maxCapacity: 100,
        capacityOccupied: 30,
    },
    {
        _id: "3",
        name: "Charlie Lee",
        email: "charlie@example.com",
        role: "Manager",
        maxCapacity: 100,
        capacityOccupied: 30,
    },
];

const MembersPage: React.FC = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleAddMember = () => setShowRegisterForm(true);
    const handleCloseForm = () => setShowRegisterForm(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl flex-1 flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-bold mb-4 sm:mb-0">Members</h1>
                    <button
                        onClick={handleAddMember}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add Member
                    </button>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <ProfileCard key={user._id} user={user} />
                    ))}
                </div>

                {showRegisterForm && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                            <RegisterForm onClose={handleCloseForm} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MembersPage;
