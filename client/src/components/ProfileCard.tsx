import React from "react";
import type { User } from "../features/auth/auth.slice";
import { calculateCapacity } from "../constants/constants";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface ProfileCardProps {
    user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
    const { availableUsers } = useSelector((state: RootState) => state.users);
    const { assignments } = useSelector(
        (state: RootState) => state.assignments
    );
    const userAssignments = assignments.filter((a) =>
        typeof a.engineer === "string"
            ? a.engineer === user._id
            : a.engineer._id === user._id
    );
    const { capacity } = calculateCapacity(
        availableUsers,
        user,
        userAssignments
    );
    const capacityPercent = Math.min(100, (capacity * 100) / user.maxCapacity);

    return (
        <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">
                    {user.name}
                </h2>
                <p className="text-gray-500 capitalize">{user.role}</p>
            </div>
            <div>
                <label className="block text-gray-700 mb-1 font-medium">
                    Capacity
                </label>
                <div className="w-full bg-gray-200 rounded-full h-4 relative">
                    <div
                        className={`bg-blue-500 h-4 rounded-full transition-all duration-300`}
                        style={{ width: `${capacity}%` }}
                    ></div>
                    <span className="absolute right-2 top-0 text-xs text-gray-700 h-4 flex items-center">
                        {capacity}/{user.maxCapacity}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Example usage with sample data
// <ProfileCard name="John Doe" role="engineer" capacityOccupied={30} maxCapacity={50} />

export default ProfileCard;
