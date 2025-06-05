import React, { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignmentsByEngineerId } from "../features/assignments/assignment.api";
import type { Project } from "../features/projects/project.slice";
import { Link } from "react-router-dom";

type Assignment = {
    _id?: string;
    engineer: string;
    project: Project;
    name: string;
    description: string;
    allocationPercentage: number;
    startDate: string;
    endDate?: string;
    role: "Developer" | "Tech Lead" | "Manager" | "QA" | "Other";
    status: "active" | "completed" | "on hold";
    createdAt?: string;
    updatedAt?: string;
};

const EngineerDashboard: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { assignments } = useSelector(
        (state: RootState) => state.assignments
    );
    useEffect(() => {
        dispatch(fetchAssignmentsByEngineerId());
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">My Assignments</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                                Project
                            </th>
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                                Name
                            </th>
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                                Description
                            </th>
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                                Role
                            </th>
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                                Allocation %
                            </th>
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                                Start Date
                            </th>
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                                End Date
                            </th>
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length > 0 ? (
                            assignments.slice(0, 4).map((assignment) => (
                                <tr
                                    key={assignment._id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2 border-b text-sm">
                                        {assignment.project.name}
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm">
                                        {assignment.name}
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm">
                                        {assignment.description}
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm">
                                        {assignment.role}
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm">
                                        {assignment.allocationPercentage}%
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm">
                                        {assignment.startDate}
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm">
                                        {assignment.endDate || "-"}
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm capitalize">
                                        <span
                                            className={
                                                assignment.status === "active"
                                                    ? "inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded"
                                                    : assignment.status ===
                                                      "completed"
                                                    ? "inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded"
                                                    : "inline-block px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded"
                                            }
                                        >
                                            {assignment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center">
                                    No assignments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {assignments.length > 4 ? (
                    <Link
                        to={"/assignments"}
                        className="float-right text-blue-600 hover:underline p-3"
                    >
                        ...More
                    </Link>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default EngineerDashboard;
