import React from "react";

const ManagerDashboard: React.FC = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Available Projects Section */}
                <section className="flex-1 min-w-[250px] bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Available Projects
                    </h2>
                    <ul className="space-y-2">
                        <li className="border-b pb-2">Project Alpha</li>
                        <li className="border-b pb-2">Project Beta</li>
                        <li>Project Gamma</li>
                    </ul>
                </section>

                {/* Tasks Section */}
                <section className="flex-1 min-w-[250px] bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                    <ul className="space-y-2">
                        <li className="border-b pb-2">Design UI for Alpha</li>
                        <li className="border-b pb-2">
                            Setup backend for Beta
                        </li>
                        <li>Testing for Gamma</li>
                    </ul>
                </section>

                {/* Users Section */}
                <section className="flex-1 min-w-[250px] bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Users</h2>
                    <ul className="space-y-2">
                        <li className="border-b pb-2">Alice (Developer)</li>
                        <li className="border-b pb-2">Bob (Designer)</li>
                        <li>Charlie (QA)</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default ManagerDashboard;
