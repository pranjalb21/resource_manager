import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProjectsPage from "./pages/ProjectsPage";
import AssignmentPage from "./pages/AssignmentPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import MembersPage from "./pages/MembersPage";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import type { AppDispatch } from "./store/store";
import { useEffect } from "react";
import ProtectedRoute from "./auth/Protected";
import { loadUserByToken } from "./features/auth/auth.apis";
import Loading from "./components/Loading";
import { toast } from "react-toastify";
import Logout from "./components/Logout";
import ProtectedManagerRoutes from "./auth/ProtectedManagerRoutes";

function App() {
    const dispatch: AppDispatch = useDispatch();
    const { loadingStatus, errors } = useSelector(
        (state: RootState) => state.auth
    );
    const { loadingAssignment } = useSelector(
        (state: RootState) => state.assignments
    );
    const { loadingProjects } = useSelector(
        (state: RootState) => state.projects
    );

    const initializeUser = () => {
        dispatch(loadUserByToken());
    };
    useEffect(() => {
        initializeUser();
    }, [dispatch]);
    useEffect(() => {
        if (errors) {
            console.log(errors, "errors");

            toast.error(errors);
        }
    }, [errors]);
    return (
        <>
            {(loadingStatus || loadingAssignment || loadingProjects) && (
                <Loading />
            )}
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/assignments" element={<AssignmentPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route element={<ProtectedManagerRoutes />}>
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route
                            path="/project-details/:projectId"
                            element={<ProjectDetailsPage />}
                        />
                        <Route path="/members" element={<MembersPage />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
