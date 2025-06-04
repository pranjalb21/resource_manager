import React from "react";
import AssignmentCard from "./AssignmentCard";

interface Assignment {
    _id: string;
    engineerId: string;
    projectId: string;
    allocationPercentage: number;
    startDate: string;
    endDate?: string;
    role: "Developer" | "Tech Lead" | "Manager" | "QA" | "Other";
    status: "active" | "completed" | "on hold";
    createdAt?: string;
    updatedAt?: string;
    name: string;
    description?: string;
}

interface AssignmentsProps {
    assignments: Assignment[];
    title: string;
}



const Assignments: React.FC<AssignmentsProps> = ({ title, assignments }) => {
    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
                {assignments.map((assignment) => (
                    <AssignmentCard
                        key={assignment._id}
                        assignment={assignment}
                    />
                ))}
            </div>
        </div>
    );
};

export default Assignments;
