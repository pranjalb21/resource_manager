import React from "react";
import Assignments from "../components/Assignments";

interface Assignment {
    _id: string;
    engineerId: string;
    name: string;
    description?: string;
    projectId: string;
    allocationPercentage: number;
    startDate: string;
    endDate?: string;
    role: "Developer" | "Tech Lead" | "Manager" | "QA" | "Other";
    status: "active" | "completed" | "on hold";
    createdAt?: string;
    updatedAt?: string;
}
const assignments: Assignment[] = [
    {
        _id: "1",
        engineerId: "665f1a2b3c4d5e6f7a8b9c01",
        name: "Frontend Implementation",
        description: "Develop the main UI components using React.",
        projectId: "665f1a2b3c4d5e6f7a8b9c0d",
        allocationPercentage: 60,
        startDate: "2024-06-10",
        endDate: "2024-07-15",
        role: "Developer",
        status: "active",
    },
    {
        _id: "2",
        engineerId: "665f1a2b3c4d5e6f7a8b9c02",
        name: "Architecture Design",
        description: "Lead the technical design and architecture decisions.",
        projectId: "665f1a2b3c4d5e6f7a8b9c0d",
        allocationPercentage: 80,
        startDate: "2024-06-15",
        endDate: "2024-08-01",
        role: "Tech Lead",
        status: "on hold",
    },
    {
        _id: "3",
        engineerId: "665f1a2b3c4d5e6f7a8b9c03",
        name: "Testing & QA",
        description: "Perform end-to-end and regression testing.",
        projectId: "665f1a2b3c4d5e6f7a8b9c0d",
        allocationPercentage: 100,
        startDate: "2024-06-20",
        endDate: "2024-07-25",
        role: "QA",
        status: "completed",
    },
];

const AssignmentPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <Assignments title="Assignments" assignments={assignments} />
        </div>
    );
};

export default AssignmentPage;
