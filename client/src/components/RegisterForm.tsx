import React from "react";
import { useForm, Controller } from "react-hook-form";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/user.api";
import { toast } from "react-toastify";

interface RegisterFormInputs {
    onClose: () => void;
}

type UserFormInputs = {
    name: string;
    email: string;
    role: "engineer" | "manager";
    skills?: string[];
    seniority?: "junior" | "mid" | "senior";
    maxCapacity?: 100 | 50;
    department?: string;
    password: string;
};
const roleOptions = [
    { value: "engineer", label: "Engineer" },
    { value: "manager", label: "Manager" },
];

const seniorityOptions = [
    { value: "junior", label: "Junior" },
    { value: "mid", label: "Mid" },
    { value: "senior", label: "Senior" },
];

const maxCapacityOptions = [
    { value: 100, label: "100" },
    { value: 50, label: "50" },
];

const RegisterForm: React.FC<RegisterFormInputs> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
    } = useForm<UserFormInputs>({
        defaultValues: {
            role: "engineer",
            seniority: "junior",
            maxCapacity: 100,
            skills: [],
        },
    });

    const role = watch("role");
    const dispatch: AppDispatch = useDispatch();
    const onSubmit = (data: UserFormInputs) => {
        // Handle form submission (e.g., send to API)
        console.log(data);
        dispatch(addUser({ ...data, maxCapacity: Number(data.maxCapacity) }))
            .unwrap()
            .then(() => toast.success("User added successfully."))
            .then(() => {
                onClose();
                reset();
            })
            .catch((err) => toast.error("Unable to add user."));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
                onClick={onClose}
                aria-label="Close"
            >
                &times;
            </button>
            <h2 className="text-2xl text-center font-bold mb-6">
                Register User
            </h2>
            <div className="md:flex md:space-x-4">
                <div className="mb-4 md:flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        {...register("name", {
                            required: "Name is required",
                        })}
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-xs">
                            {errors.name.message}
                        </span>
                    )}
                </div>

                <div className="mb-4 md:flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email",
                            },
                        })}
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs">
                            {errors.email.message}
                        </span>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Role
                </label>
                <select
                    {...register("role", { required: "Role is required" })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    {roleOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {errors.role && (
                    <span className="text-red-500 text-xs">
                        {errors.role.message}
                    </span>
                )}
            </div>

            {role === "engineer" && (
                <>
                    <div className="md:flex md:space-x-4">
                        <div className="mb-4 md:flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Skills (comma separated)
                            </label>
                            <Controller
                                name="skills"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        placeholder="e.g. React,Node.js"
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value
                                                    .split(",")
                                                    .map((s) => s.trim())
                                                    .filter(Boolean)
                                            )
                                        }
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                )}
                            />
                        </div>

                        <div className="mb-4 md:flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Seniority
                            </label>
                            <select
                                {...register("seniority")}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {seniorityOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="md:flex md:space-x-4">
                        <div className="mb-4 md:flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Max Capacity
                            </label>
                            <select
                                {...register("maxCapacity")}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {maxCapacityOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4 md:flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Department
                            </label>
                            <input
                                {...register("department")}
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                </>
            )}

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </label>
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "Minimum 5 characters",
                        },
                    })}
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.password && (
                    <span className="text-red-500 text-xs">
                        {errors.password.message}
                    </span>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
