import React, { use, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { RootState } from "../store/store";

const ProtectedManagerRoutes = () => {
    const { user, loadingStatus } = useSelector(
        (state: RootState) => state.auth
    ); // loadingStatus: boolean, user: { role: string }
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loadingStatus && user?.role !== "manager") {
            toast.error("Access denied");
            navigate(location.state?.from?.pathname || "/", {
                replace: true,
            });
        }
        // eslint-disable-next-line
    }, [loadingStatus, user, location, navigate]);

    if (user?.role === "manager") {
        return <Outlet />;
    }

    // Prevent rendering children if not authorized
    return null;
};

export default ProtectedManagerRoutes;
