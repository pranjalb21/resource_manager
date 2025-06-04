import React from "react";

type Assignment = {
    _id?: string;
    engineerId:
        | {
              _id: string;
              name: string;
          }
        | string;
    projectId:
        | {
              _id: string;
              name: string;
          }
        | string;
    name: string;
    description?: string;
    allocationPercentage: number;
    startDate: string | Date;
    endDate?: string | Date;
    role: "Developer" | "Tech Lead" | "Manager" | "QA" | "Other";
    status?: "active" | "completed" | "on hold";
    createdAt?: string;
    updatedAt?: string;
};

type AssignmentCardProps = {
    assignment: Assignment;
};

const formatDate = (date: string | Date | undefined) => {
    if (!date) return "-";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString();
};

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
    assignment,
}) => {
    return (
        <div className="border border-gray-200 rounded-lg p-4 m-2 bg-gray-50 shadow-sm">
            <h2 className="text-xl font-bold mb-1 text-gray-900">
                {assignment.name}
            </h2>
            {assignment.description && (
                <p className="mb-2 text-gray-700">{assignment.description}</p>
            )}
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {typeof assignment.projectId === "object"
                    ? assignment.projectId.name
                    : assignment.projectId}
            </h3>
            <div className="mb-1">
                <span className="font-medium text-gray-600">Engineer:</span>{" "}
                <span className="text-gray-800">
                    {typeof assignment.engineerId === "object"
                        ? assignment.engineerId.name
                        : assignment.engineerId}
                </span>
            </div>
            <div className="mb-1">
                <span className="font-medium text-gray-600">Role:</span>{" "}
                <span className="text-gray-800">{assignment.role}</span>
            </div>
            <div className="mb-1">
                <span className="font-medium text-gray-600">Allocation:</span>{" "}
                <span className="text-gray-800">
                    {assignment.allocationPercentage}%
                </span>
            </div>
            <div className="mb-1">
                <span className="font-medium text-gray-600">Status:</span>{" "}
                <span
                    className={
                        "font-semibold " +
                        (assignment.status === "completed"
                            ? "text-green-600"
                            : assignment.status === "on hold"
                            ? "text-orange-500"
                            : "text-blue-600")
                    }
                >
                    {assignment.status || "active"}
                </span>
            </div>
            <div className="mb-1">
                <span className="font-medium text-gray-600">Start:</span>{" "}
                <span className="text-gray-800">
                    {formatDate(assignment.startDate)}
                </span>
            </div>
            <div>
                <span className="font-medium text-gray-600">End:</span>{" "}
                <span className="text-gray-800">
                    {formatDate(assignment.endDate)}
                </span>
            </div>
        </div>
    );
};

export default AssignmentCard;
