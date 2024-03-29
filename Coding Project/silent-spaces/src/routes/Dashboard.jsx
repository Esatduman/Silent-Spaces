import { useOutlet } from "react-router-dom";
import { Context } from "../components/AuthContext";
import "./dashboard.scss";
import profileIcon from "@assets/login-user-name-1 1.png"
import { useContext } from "react";
import { Link } from "react-router-dom";

export function Dashboard() {
    const outlet = useOutlet();
    const { user } = useContext(Context);

    return (
    <>
    <div>
        <div className="dashboard-header">
            <nav>
                <ul>
                <li>
                    <Link to="">Find A Space</Link>
                </li>
                <li>
                    <Link to="create-a-space">Create A Space</Link>
                </li>
                <li>
                    <Link to="create-guide">Create Guide Profile</Link>
                </li>
                </ul>
            </nav>
            <div className="profile-info">{user && <img className="profile_icon" src={profileIcon}></img>}
            {user.displayName || user.email || "(anonymous sign-in)"}
            </div>
            {user &&
            <>
            <button className="auth-btn" onClick={(e) => {handleLogout(); e.preventDefault();}}>Logout</button>
            </>
            }
        </div>
        <div>
            {outlet || <>Error: Unknown dashboard page.</>}
        </div>

    </div>
        
    </>
    );
}
