import React from "react";
import NewProjectForm from "../components/NewProjectForm";
import { useNavigate } from "react-router-dom";

type Project = {
    _id: string;
    name: string;
    description?: string;
    startDate: string;
    endDate?: string;
    requiredSkills: string[];
    teamSize: number;
    status: "planning" | "active" | "completed";
    managerId: string;
};

const mockProjects: Project[] = [
    {
        _id: "1",
        name: "Website Redesign",
        description: "Redesign the company website.",
        startDate: "2024-06-01",
        endDate: "2024-08-01",
        requiredSkills: ["React", "UI/UX"],
        teamSize: 5,
        status: "active",
        managerId: "u1",
    },
    {
        _id: "2",
        name: "Mobile App",
        description: "Develop a mobile app for clients.",
        startDate: "2024-07-01",
        endDate: "",
        requiredSkills: ["React Native", "API"],
        teamSize: 3,
        status: "planning",
        managerId: "u2",
    },
];

const Projects: React.FC = () => {
    // Replace mockProjects with data from API in real usage
    const projects = mockProjects;

    const [showNewProjectForm, setShowNewProjectForm] = React.useState(false);
    // Import the NewProjectForm component
    const navigate = useNavigate();
    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-2xl font-bold mb-2 sm:mb-0">Projects</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => setShowNewProjectForm(true)}
                >
                    + Add New Project
                </button>
            </div>
            {showNewProjectForm && (
                <NewProjectForm onClose={() => setShowNewProjectForm(false)} />
            )}
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Name
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Start Date
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                End Date
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Skills
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Team Size
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {projects.map((project) => (
                            <tr
                                key={project._id}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() =>
                                    navigate(`/project-details/${project._id}`)
                                }
                            >
                                <td className="px-4 py-2 font-medium">
                                    {project.name}
                                </td>
                                <td className="px-4 py-2">
                                    {new Date(
                                        project.startDate
                                    ).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2">
                                    {project.endDate
                                        ? new Date(
                                              project.endDate
                                          ).toLocaleDateString()
                                        : "-"}
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex flex-wrap gap-1">
                                        {project.requiredSkills.map(
                                            (skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    {project.teamSize}
                                </td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${
                                            project.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : project.status === "planning"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {project.status
                                            .charAt(0)
                                            .toUpperCase() +
                                            project.status.slice(1)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No projects found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Projects;
