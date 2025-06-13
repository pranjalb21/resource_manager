import React, { useEffect } from "react";
import Assignments from "../components/Assignments";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "../features/projects/project.apis";

const ProjectDetailsPage: React.FC = () => {
    // Example project data (replace with real data or props)
    // const project = {
    //     name: "Resource Management System",
    //     description:
    //         "A web application to manage resources efficiently across multiple projects.",
    //     status: "active",
    //     startDate: "2024-06-01",
    //     endDate: "2024-12-31",
    //     requiredSkills: ["React", "Node.js", "MongoDB"],
    //     teamSize: 5,
    //     managerId: "665f1a2b3c4d5e6f7a8b9c0d",
    // };

    interface Assignment {
        _id: string;
        engineer: string;
        name: string;
        description?: string;
        project: string;
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
            engineer: "665f1a2b3c4d5e6f7a8b9c01",
            name: "Frontend Implementation",
            description: "Develop the main UI components using React.",
            project: "665f1a2b3c4d5e6f7a8b9c0d",
            allocationPercentage: 60,
            startDate: "2024-06-10",
            endDate: "2024-07-15",
            role: "Developer",
            status: "active",
        },
        {
            _id: "2",
            engineer: "665f1a2b3c4d5e6f7a8b9c02",
            name: "Architecture Design",
            description:
                "Lead the technical design and architecture decisions.",
            project: "665f1a2b3c4d5e6f7a8b9c0d",
            allocationPercentage: 80,
            startDate: "2024-06-15",
            endDate: "2024-08-01",
            role: "Tech Lead",
            status: "on hold",
        },
        {
            _id: "3",
            engineer: "665f1a2b3c4d5e6f7a8b9c03",
            name: "Testing & QA",
            description: "Perform end-to-end and regression testing.",
            project: "665f1a2b3c4d5e6f7a8b9c0d",
            allocationPercentage: 100,
            startDate: "2024-06-20",
            endDate: "2024-07-25",
            role: "QA",
            status: "completed",
        },
    ];
    const { projectId } = useParams<{ projectId: string }>();
    const dispatch: AppDispatch = useDispatch();
    const { project } = useSelector((state: RootState) => state.projects);
    useEffect(() => {
        console.log(projectId);
        if (projectId) {
            dispatch(fetchProjectById(projectId));
        }
    }, [projectId]);

    useEffect(() => {
        if (project) {
            console.log(project);
        }
    }, [project]);
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                    {project?.name}
                </h1>
                <p className="text-gray-600 mb-4">{project?.description}</p>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0">
                    <span className="inline-block w-28 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {project?.status?.charAt(0).toUpperCase() +
                            project?.status?.slice(1)}
                    </span>
                    <span className="text-gray-500 text-sm">
                        Start:{" "}
                        {new Date(project.startDate).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                    <span className="text-gray-500 text-sm">
                        End:{" "}
                        {project?.endDate
                            ? new Date(project.endDate).toLocaleString(
                                  "en-IN",
                                  {
                                      timeZone: "Asia/Kolkata",
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                  }
                              )
                            : "Not Mentioned"}
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
                <Assignments title="Assignments" projectId={projectId} />
            </div>
        </div>
    );
};

export default ProjectDetailsPage;
