import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProjectsPage from "./pages/ProjectsPage";
import AssignmentPage from "./pages/AssignmentPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import MembersPage from "./pages/MembersPage";

function App() {
    return (
        <>
            <Navbar loggedIn={false} />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route
                    path="/project-details/:projectId"
                    element={<ProjectDetailsPage />}
                />
                <Route path="/assignments" element={<AssignmentPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/members" element={<MembersPage />} />
            </Routes>
        </>
    );
}

export default App;
