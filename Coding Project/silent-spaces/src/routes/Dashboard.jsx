import { useOutlet } from "react-router-dom";
import { Context } from "../components/AuthContext";
import "./dashboard.scss";
import profileIcon from "@assets/login-user-name-1 1.png"
import { useContext } from "react";

export function Dashboard() {
    const outlet = useOutlet();
    const { user } = useContext(Context);

    return (
    <>
    <div>
        {/* <h1>Dashboard.</h1> */}
        {user && <img className="profile_icon" src={profileIcon}></img>}
        <div>
            {outlet || <>Error: Unknown dashboard page.</>}
        </div>

    </div>
        
    </>
    );
}
