import { useOutlet } from "react-router-dom";
import { Context } from "../components/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { signOut, getAuth } from "firebase/auth";
import "./dashboard.scss";
import profileIcon from "@assets/login-user-name-1 1.png";

export function Dashboard() {
    const outlet = useOutlet();
    const db = getFirestore();
    const auth = getAuth();
    const { user } = useContext(Context);

    useEffect(() => {
        fetchData();
    }, []);

    const [isUserGuide, setIsUserGuide] = useState(false);

    const fetchData = async () => {
        const userDoc = doc(db, "users", user.uid);
        const userDocRef = await getDoc(userDoc);
        setIsUserGuide(userDocRef.exists());
    }

    async function handleLogout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <nav>
                    <ul>
                        <li>
                            <Link to="/dashboard">Find A Space</Link>
                        </li>
                        {isUserGuide ? (
                            <li>
                                <Link to="/dashboard/create-a-space">Create A Space</Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/dashboard/create-guide">Create Guide Profile</Link>
                            </li>
                        )}
                    </ul>
                </nav>
                <div className="user-profile-logout">
                    <div className="profile-info">
                        {user && <img className="profile-icon" src={profileIcon} alt="Profile" />}
                        <span>{user.displayName || user.email || "(anonymous sign-in)"}</span>
                    </div>
                    {user && (
                        <button className="auth-btn" onClick={(e) => { handleLogout(); e.preventDefault(); }}>Logout</button>
                    )}
                </div>
            </header>
            <main className="dashboard-content">
                {outlet || <p>Error: Unknown dashboard page.</p>}
            </main>
        </div>
    );
}
