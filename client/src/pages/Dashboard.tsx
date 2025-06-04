import React from "react";
import ManagerDashboard from "../components/ManagerDashboard";

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <main className="w-full max-w-6xl flex-1 flex flex-col">
                <section className="bg-white rounded-lg shadow p-4 sm:p-8 flex-1">
                    <ManagerDashboard />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
