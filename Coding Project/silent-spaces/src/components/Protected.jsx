import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./AuthContext";

export function Protected({children}) {
    const {user} = useContext(Context);
    if(!user) {
        return <Navigate to="/login" replace></Navigate>
    } else {
        return children
    }
}