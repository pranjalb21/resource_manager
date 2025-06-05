import React, { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { loadProjects } from "../features/projects/project.apis";
import AssignmentForm from "./AssignmentForm";
import {
    fetchAssignmentsByEngineerId,
    fetchAssignmentsByProjectId,
    loadAssignments,
} from "../features/assignments/assignment.api";

interface Assignment {
    _id: string;
    engineer: string;
    project: string;
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
    title: string;
    projectId: string;
}

const Assignments: React.FC<AssignmentsProps> = ({
    title,
    projectId = null,
}) => {
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        if (user?.role === "manager") {
            if (projectId !== null) {
                console.log(projectId, "null");

                dispatch(fetchAssignmentsByProjectId(projectId));
            } else {
                console.log(projectId, "as");
                dispatch(loadAssignments());
            }
        } else if (user?.role === "engineer") {
            dispatch(fetchAssignmentsByEngineerId());
        }
    }, [dispatch, projectId]);
    const { assignments } = useSelector(
        (state: RootState) => state.assignments
    );
    const [showNewAssignmentForm, setShowNewAssignmentForm] = useState(false);
    return (
        <div className="">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {title}
                </h2>
                {user?.role === "manager" && (
                    <button
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition cursor-pointer"
                        onClick={() => setShowNewAssignmentForm(true)}
                    >
                        + Add New Assignment
                    </button>
                )}
            </div>
            {showNewAssignmentForm && (
                <AssignmentForm
                    onClose={() => setShowNewAssignmentForm(false)}
                />
            )}
            <div className="grid gap-4 md:grid-cols-2">
                {assignments.length > 0 ? (
                    assignments.map((assignment) => (
                        <AssignmentCard
                            key={assignment._id}
                            assignment={assignment}
                        />
                    ))
                ) : (
                    <p>No assignments found.</p>
                )}
            </div>
        </div>
    );
};

export default Assignments;
