import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { loadProjects } from "../features/projects/project.apis";
import { loadAssignments } from "../features/assignments/assignment.api";
import { loadAllUsers } from "../features/users/user.api";
import { Link } from "react-router-dom";
import { calculateCapacity } from "../constants/constants";

const ManagerDashboard: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { projects } = useSelector((state: RootState) => state.projects);
    const { assignments } = useSelector(
        (state: RootState) => state.assignments
    );
    const { availableUsers } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(loadProjects());
        dispatch(loadAssignments());
        dispatch(loadAllUsers());
    }, [dispatch]);
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="flex flex-col md:flex-row gap-8 flex-wrap">
                {/* Available Projects Section */}
                <section className="flex-1 min-w-[250px] bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Available Projects
                    </h2>
                    {projects.length > 0 ? (
                        <ul className="space-y-2">
                            {projects.slice(0, 4).map((project) => (
                                <li key={project._id} className="border-b pb-2">
                                    {project.name} -{" "}
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${
                                            project.status === "active"
                                                ? "bg-orange-100 text-orange-800"
                                                : project.status === "planning"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-green-200 text-green-800"
                                        }`}
                                    >
                                        {project.status
                                            .charAt(0)
                                            .toUpperCase() +
                                            project.status.slice(1)}
                                    </span>
                                </li>
                            ))}
                            {projects.length > 4 ? (
                                <Link
                                    to={"/projects"}
                                    className="float-right text-blue-600 hover:underline"
                                >
                                    ...More
                                </Link>
                            ) : (
                                ""
                            )}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No projects available.</p>
                    )}
                </section>

                {/* Tasks Section */}
                <section className="flex-1 min-w-[250px] bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Assignments</h2>
                    {assignments.length > 0 ? (
                        <ul className="space-y-2">
                            {assignments.slice(0, 4).map((assignment) => (
                                <li
                                    key={assignment._id}
                                    className="border-b pb-2"
                                >
                                    {assignment.name} -{" "}
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${
                                            assignment.status === "active"
                                                ? "bg-orange-100 text-orange-800"
                                                : assignment.status ===
                                                  "completed"
                                                ? "bg-green-200 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        {assignment?.status
                                            .charAt(0)
                                            .toUpperCase() +
                                            assignment?.status.slice(1)}
                                    </span>
                                </li>
                            ))}
                            {assignments.length > 4 ? (
                                <Link
                                    to={"/assignments"}
                                    className="float-right text-blue-600 hover:underline"
                                >
                                    ...More
                                </Link>
                            ) : (
                                ""
                            )}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No tasks available.</p>
                    )}
                </section>

                {/* Users Section */}
                <section className="flex-1 min-w-[250px] bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Users</h2>
                    {availableUsers.length > 0 ? (
                        <ul className="space-y-2">
                            {availableUsers.slice(0, 4).map((user) => (
                                <li key={user._id} className="border-b pb-2">
                                    {user.name} -{" "}
                                    <span className="text-xs font-semibold">
                                        {user.role.charAt(0).toUpperCase() +
                                            user.role.slice(1)}
                                    </span>
                                </li>
                            ))}
                            {availableUsers.length > 4 ? (
                                <Link
                                    to={"/members"}
                                    className="float-right text-blue-600 hover:underline"
                                >
                                    ...More
                                </Link>
                            ) : (
                                ""
                            )}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No users available.</p>
                    )}
                </section>
                <section className="flex-1 min-w-[250px] bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Available Users
                    </h2>
                    {availableUsers.length > 0 ? (
                        <ul className="space-y-2">
                            {availableUsers.slice(0, 4).map((user) => {
                                const { capacity } = calculateCapacity(
                                    availableUsers,
                                    user,
                                    assignments
                                );
                                return (
                                    <li
                                        key={user._id}
                                        className="border-b pb-2"
                                    >
                                        {user.name} -{" "}
                                        <span className="inline-block">
                                            <span className="text-xs font-semibold">
                                                {user.role
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    user.role.slice(1)}
                                            </span>
                                            {"  "} -{" "}
                                            <span>{capacity}% Utilized</span>
                                        </span>
                                    </li>
                                );
                            })}
                            {availableUsers.length > 4 ? (
                                <Link
                                    to={"/members"}
                                    className="float-right text-blue-600 hover:underline"
                                >
                                    ...More
                                </Link>
                            ) : (
                                ""
                            )}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No users available.</p>
                    )}
                </section>
                {/* <section className="flex-1 min-w-[250px] bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Overloaded Users
                    </h2>
                    {availableUsers.length > 0 ? (
                        <ul className="space-y-2">
                            {availableUsers.slice(0, 4).map((user) => {
                                const { capacity, overLoaded } =
                                    calculateCapacity(
                                        availableUsers,
                                        user,
                                        assignments
                                    );
                                if (overLoaded) {
                                    return (
                                        <li
                                            key={user._id}
                                            className="border-b pb-2"
                                        >
                                            {user.name} -{" "}
                                            <span className="inline-block">
                                                <span className="text-xs font-semibold">
                                                    {user.role
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        user.role.slice(1)}
                                                </span>
                                                {"  "} -{" "}
                                                <span>
                                                    {capacity}% Utilized
                                                </span>
                                            </span>
                                        </li>
                                    );
                                }
                            })}
                            {availableUsers.length > 4 ? (
                                <Link
                                    to={"/members"}
                                    className="float-right text-blue-600 hover:underline"
                                >
                                    ...More
                                </Link>
                            ) : (
                                ""
                            )}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No users available.</p>
                    )}
                </section> */}
            </div>
        </div>
    );
};

export default ManagerDashboard;
