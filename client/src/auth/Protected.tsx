import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const { isAuthenticated, loadingStatus } = useSelector(
        (state: RootState) => state.auth
    );
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !loadingStatus) {
            localStorage.setItem(
                "redirectUrl",
                location.pathname + location.search
            );
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, loadingStatus, location, navigate]);

    if (!loadingStatus && isAuthenticated) {
        return <Outlet />;
    }

    // Optionally, render nothing or a loading indicator while loadingStatus is true
    return null;
};

export default ProtectedRoute;
