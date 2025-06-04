import React from "react";
import Assignments from "../components/Assignments";

const ProjectDetailsPage: React.FC = () => {
    // Example project data (replace with real data or props)
    const project = {
        name: "Resource Management System",
        description:
            "A web application to manage resources efficiently across multiple projects.",
        status: "active",
        startDate: "2024-06-01",
        endDate: "2024-12-31",
        requiredSkills: ["React", "Node.js", "MongoDB"],
        teamSize: 5,
        managerId: "665f1a2b3c4d5e6f7a8b9c0d",
    };

    interface Assignment {
        _id: string;
        engineerId: string;
        name:string,
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

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                    {project.name}
                </h1>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {project.status}
                    </span>
                    <span className="text-gray-500 text-sm">
                        Start: {project.startDate}
                    </span>
                    <span className="text-gray-500 text-sm">
                        End: {project.endDate}
                    </span>
                </div>
            </div>

            {/* <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Team Members
                </h2>
                <ul className="divide-y divide-gray-200">
                    {project.team.map((member, idx) => (
                        <li
                            key={idx}
                            className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                        >
                            <span className="font-medium text-gray-800">
                                {member.name}
                            </span>
                            <span className="text-gray-500 text-sm">
                                {member.role}
                            </span>
                        </li>
                    ))}
                </ul>
            </div> */}

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <Assignments title="Assignments" assignments={assignments} />
            </div>
        </div>
    );
};

export default ProjectDetailsPage;
