import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { addProject } from "../features/projects/project.apis";
import type { Project } from "../features/projects/project.slice";

interface NewProjectFormProps {
    onClose: () => void;
}

const statusOptions = [
    { value: "planning", label: "Planning" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
];

const NewProjectForm: React.FC<NewProjectFormProps> = ({ onClose }) => {
    // Define form values type
    const dispatch: AppDispatch = useDispatch();
    type FormValues = {
        name: string;
        description?: string;
        startDate: string;
        endDate?: string;
        requiredSkills: { value: string }[];
        teamSize: number;
        status: string;
    };
    const values = {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        requiredSkills: [{ value: "" }],
        teamSize: 1,
        status: "planning",
    };
    // React Hook Form setup
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
        clearErrors,
        reset,
    } = useForm<FormValues>({
        defaultValues: values,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "requiredSkills",
    });

    type FormDataType = {
        name: string;
        startDate: string;
        status: string;
        teamSize: number;
        description?: string;
        requiredSkills?: string[];
        endDate?: string;
    };
    // Form submit handler
    const handleSubmitForm = (data: FormValues) => {
        // Transform requiredSkills to string[]
        const formData: FormDataType = {
            name: data.name,
            startDate: data.startDate,
            status: data.status,
            teamSize: data.teamSize,
        };
        if (data.description !== "") formData.description = data.description;
        if (data.requiredSkills.length > 0)
            formData.requiredSkills = data.requiredSkills
                ?.map((s) => s.value)
                .filter((val) => val !== "");
        if (data.endDate !== "") formData.endDate = data.endDate;

        // console.log("Form submitted with data:", formData);
        dispatch(addProject(formData))
            .unwrap()
            .then(() => reset())
            .then(() => onClose())
            .catch((err) => console.log(err));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 relative animate-fade-in"
                style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    New Project
                </h2>
                <form
                    onSubmit={handleSubmit(handleSubmitForm)}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Project Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            {...register("description")}
                            rows={3}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">
                                Start Date
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                {...register("startDate")}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.startDate && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.startDate?.message}
                                </p>
                            )}
                            {/* <input
                                type="text"
                                {...register("name", {
                                    required: "Project name is required",
                                    validate: (value) =>
                                        value.trim() !== "" ||
                                        "Project name is required",
                                })}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name.message}
                                </p>
                            )} */}
                        </div>
                    </div>
                    {/* <div>
                        <label className="block text-sm font-medium mb-1">
                            Start Date<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            {...register("startDate", {
                                required: "Start date is required",
                            })}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.startDate && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.startDate.message}
                            </p>
                        )}
                    </div> */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            {...register("endDate")}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Required Skills
                        </label>
                        {fields.map((field, idx) => (
                            <div
                                key={field.id}
                                className="flex items-center gap-2 mb-2"
                            >
                                <input
                                    type="text"
                                    {...register(
                                        `requiredSkills.${idx}.value` as const
                                    )}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(idx)}
                                        className="text-red-500 hover:text-red-700 px-2"
                                        aria-label="Remove skill"
                                    >
                                        &minus;
                                    </button>
                                )}
                                {idx === fields.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={() => append({ value: "" })}
                                        className="text-green-500 hover:text-green-700 px-2"
                                        aria-label="Add skill"
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">
                                Team Size<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min={1}
                                {...register("teamSize", {
                                    valueAsNumber: true,
                                    required: "Team size must be at least 1",
                                    min: {
                                        value: 1,
                                        message: "Team size must be at least 1",
                                    },
                                })}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.teamSize && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.teamSize.message}
                                </p>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">
                                Status
                            </label>
                            <select
                                {...register("status")}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {statusOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
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
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default NewProjectForm;
