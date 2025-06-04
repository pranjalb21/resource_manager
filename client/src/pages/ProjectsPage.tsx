import React from "react";
import Projects from "../components/Projects";

const ProjectsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-8">
            <header className="w-full max-w-5xl mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
                    Projects
                </h1>
                <p className="mt-2 text-gray-600 text-center text-base sm:text-lg">
                    Manage and explore all your projects in one place.
                </p>
            </header>
            <main className="w-full max-w-5xl flex-1">
                <Projects />
            </main>
        </div>
    );
};

export default ProjectsPage;