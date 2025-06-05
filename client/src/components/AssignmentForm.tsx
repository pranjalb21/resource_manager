import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import type { User } from "../features/auth/auth.slice";
import { useForm } from "react-hook-form";
import { addAssignment } from "../features/assignments/assignment.api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface AssignmentFormProps {
    onClose: () => void;
    onSubmit?: (data: any) => void; // You can type this as needed
}

const roleOptions = ["Developer", "Tech Lead", "Manager", "QA", "Other"];

const statusOptions = ["active", "completed", "on hold"];

const AssignmentForm: React.FC<AssignmentFormProps> = ({
    onClose,
    onSubmit,
}) => {
    const availableUsers = useSelector((state: RootState) =>
        state.users.availableUsers.filter((u: User) => u.role === "engineer")
    );
    const availableProjects = useSelector(
        (state: RootState) => state.projects.projects
    );
    const { projectId } = useParams();
    const dispatch: AppDispatch = useDispatch();
    type DataProps = {
        engineer: string;
        project: string;
        name: string;
        description: string;
        allocationPercentage: number;
        startDate: string;
        endDate?: string;
        role: string;
        status: "active";
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<DataProps>({
        defaultValues: {
            engineer: "",
            project: projectId === null ? "" : projectId,
            name: "",
            description: "",
            allocationPercentage: 0,
            startDate: "",
            endDate: "",
            role: "",
            status: "active",
        },
    });

    const onFormSubmit = (data: DataProps) => {
        const formData: DataProps = {
            name: data.name,
            allocationPercentage: Number(data.allocationPercentage),
            engineer: data.engineer,
            project: data.project,
            description: data.description,
            startDate: data.startDate,
            role: data.role,
            status: data.status,
        };
        if (data.endDate) formData.endDate = data.endDate;
        dispatch(addAssignment(formData))
            .unwrap()
            .then(() => toast.success("Assignment added successfully"))
            .then(() => {
                onClose();
                reset();
            })
            .catch((err) => toast.error(err));
    };
    useEffect(() => console.log(projectId), [projectId]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 relative animate-fade-in"
                style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Add Assignment
                </h2>
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(onFormSubmit)}
                >
                    <div>
                        <label className="block mb-1 font-medium">
                            Engineer
                        </label>
                        <select
                            {...register("engineer", {
                                required: "Engineer is required",
                            })}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Engineer</option>
                            {availableUsers.map((user: any) => (
                                <option key={user._id} value={user._id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.engineer && (
                            <span className="text-red-500 text-sm">
                                {errors.engineer.message as string}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Project
                        </label>
                        <select
                            {...register("project", {
                                required: "Project is required",
                            })}
                            className={`w-full border rounded px-3 py-2 ${
                                projectId
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : ""
                            }`}
                            disabled={!!projectId}
                        >
                            <option value="">Select Project</option>
                            {availableProjects.map((project: any) => (
                                <option key={project._id} value={project._id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                        {errors.project && (
                            <span className="text-red-500 text-sm">
                                {errors.project.message as string}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Assignment Name
                        </label>
                        <input
                            type="text"
                            {...register("name", {
                                required: "Assignment name is required",
                            })}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Assignment Name"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">
                                {errors.name.message as string}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Description
                        </label>
                        <textarea
                            {...register("description", {
                                required: "Description is required",
                            })}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Description"
                            rows={3}
                        />
                        {errors.description && (
                            <span className="text-red-500 text-sm">
                                {errors.description.message as string}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">
                                Allocation %
                            </label>
                            <input
                                type="number"
                                {...register("allocationPercentage", {
                                    required: "Allocation % is required",
                                    min: { value: 0, message: "Min is 0" },
                                    max: { value: 100, message: "Max is 100" },
                                })}
                                className="w-full border rounded px-3 py-2"
                                placeholder="0-100"
                            />
                            {errors.allocationPercentage && (
                                <span className="text-red-500 text-sm">
                                    {
                                        errors.allocationPercentage
                                            .message as string
                                    }
                                </span>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">
                                Role
                            </label>
                            <select
                                {...register("role", {
                                    required: "Role is required",
                                })}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Role</option>
                                {roleOptions.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                            {errors.role && (
                                <span className="text-red-500 text-sm">
                                    {errors.role.message as string}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">
                                Start Date
                            </label>
                            <input
                                type="date"
                                {...register("startDate", {
                                    required: "Start date is required",
                                })}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.startDate && (
                                <span className="text-red-500 text-sm">
                                    {errors.startDate.message as string}
                                </span>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">
                                End Date
                            </label>
                            <input
                                type="date"
                                {...register("endDate")}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Status</label>
                        <select
                            {...register("status")}
                            className="w-full border rounded px-3 py-2"
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() +
                                        status.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        >
                            Add Assignment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignmentForm;
