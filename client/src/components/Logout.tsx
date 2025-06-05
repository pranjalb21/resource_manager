import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/auth.apis";
import type { AppDispatch } from "../store/store";

const Logout = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logoutUser())
            .unwrap()
            .then(() => {
                navigate("/login");
            });
        // eslint-disable-next-line
    }, [dispatch, navigate]);

    return null;
};

export default Logout;
