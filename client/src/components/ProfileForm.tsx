import React, { use, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ChangePasswordForm from "./ChangePasswordForm";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

type UserRole = "engineer" | "manager";
type Seniority = "junior" | "mid" | "senior";

interface ProfileFormValues {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    skills: { value: string }[];
    seniority: Seniority;
    maxCapacity: 100 | 50;
    department: string;
    password: string;
}

interface ProfileFormProps {
    initialValues: ProfileFormValues;
    loggedInUserRole: UserRole;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
    initialValues,
    loggedInUserRole,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        defaultValues: initialValues,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "skills",
    });

    const isEngineer = loggedInUserRole === "engineer";
    const isManager = loggedInUserRole === "manager";

    const onSubmit = (data: ProfileFormValues) => {
        // handle update logic here
        setEditMode(false);
    };

    const handleCancel = () => {
        reset(initialValues);
        setEditMode(false);
    };

    const handleEdit = () => setEditMode(true);

    const handleChangePassword = () => setShowChangePassword(true);

    const handleCloseChangePassword = () => setShowChangePassword(false);

    // Determine which fields are enabled
    const isFieldDisabled = (field: keyof ProfileFormValues) => {
        if (!editMode) return true;
        if (isManager) return false;
        if (isEngineer) {
            return field !== "skills";
        }
        return true;
    };
    useEffect(() => {
        if (user) {
            console.log(user);
            console.log(initialValues);
        }
    }, [user]);

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <button
                    className="text-blue-600 font-semibold"
                    onClick={handleEdit}
                    disabled={editMode}
                >
                    Edit
                </button>
                <button
                    className="text-blue-600 font-semibold"
                    onClick={handleChangePassword}
                >
                    Change Password
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            disabled={isFieldDisabled("name")}
                            className="mt-1 block w-full border rounded px-3 py-2 disabled:bg-gray-100"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">
                                Name is required
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            disabled={isFieldDisabled("email")}
                            className="mt-1 block w-full border rounded px-3 py-2 disabled:bg-gray-100"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">
                                Email is required
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Role</label>
                        <select
                            {...register("role", { required: true })}
                            disabled={isFieldDisabled("role")}
                            className="mt-1 block w-full border rounded px-3 py-2 disabled:bg-gray-100"
                        >
                            <option value="engineer">Engineer</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Seniority</label>
                        <select
                            {...register("seniority")}
                            disabled={isFieldDisabled("seniority")}
                            className="mt-1 block w-full border rounded px-3 py-2 disabled:bg-gray-100"
                        >
                            <option value="junior">Junior</option>
                            <option value="mid">Mid</option>
                            <option value="senior">Senior</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">
                            Max Capacity
                        </label>
                        <select
                            {...register("maxCapacity")}
                            disabled={isFieldDisabled("maxCapacity")}
                            className="mt-1 block w-full border rounded px-3 py-2 disabled:bg-gray-100"
                        >
                            <option value={100}>100</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Department</label>
                        <input
                            type="text"
                            {...register("department")}
                            disabled={isFieldDisabled("department")}
                            className="mt-1 block w-full border rounded px-3 py-2 disabled:bg-gray-100"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium">Skills</label>
                    <div className="space-y-2">
                        {fields.map((field, idx) => (
                            <div
                                key={field.id}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    {...register(
                                        `skills.${idx}.value` as const
                                    )}
                                    disabled={isFieldDisabled("skills")}
                                    className="block w-full border rounded px-3 py-2 disabled:bg-gray-100"
                                />
                                {editMode && !isFieldDisabled("skills") && (
                                    <button
                                        type="button"
                                        className="text-red-500"
                                        onClick={() => remove(idx)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        {editMode && !isFieldDisabled("skills") && (
                            <button
                                type="button"
                                className="text-blue-600"
                                onClick={() => append({ value: "" })}
                            >
                                Add Skill
                            </button>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block font-medium">Password</label>
                    <input
                        type="password"
                        {...register("password", { minLength: 5 })}
                        disabled={isFieldDisabled("password")}
                        className="mt-1 block w-full border rounded px-3 py-2 disabled:bg-gray-100"
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            Password must be at least 5 characters
                        </span>
                    )}
                </div>

                {editMode && (
                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </form>

            {showChangePassword && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <ChangePasswordForm
                            onClose={handleCloseChangePassword}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileForm;
