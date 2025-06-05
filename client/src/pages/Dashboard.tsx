import React from "react";
import ManagerDashboard from "../components/ManagerDashboard";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import EngineerDashboard from "../components/EngineerDashboard";

const Dashboard: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <main className="w-full max-w-6xl flex-1 flex flex-col">
                <section className="bg-white rounded-lg shadow p-4 sm:p-8 flex-1">
                    {user?.role === "manager" ? (
                        <ManagerDashboard />
                    ) : (
                        <EngineerDashboard />
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
