import { useOutlet } from "react-router-dom";
import { Context } from "../components/AuthContext";
import "./dashboard.scss";
import profileIcon from "@assets/login-user-name-1 1.png"
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, getFirestore} from "firebase/firestore";
import { signOut, getAuth } from "firebase/auth";

export function Dashboard() {
    const outlet = useOutlet();
    const db = getFirestore();
    const auth = getAuth();
    const { user } = useContext(Context);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const userDoc = doc(db, "users", user.uid);
        const userDocRef = await getDoc(userDoc);
        setIsUserGuide(userDocRef.exists());
    }

    const [isUserGuide, setIsUserGuide] = useState(false);

    async function handleLogout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <>
    <div>
        <div className="dashboard-header">
            <nav>
                <ul>
                <li>
                    <Link to="/dashboard">Find A Space</Link>
                </li>
                {isUserGuide &&
                <li>
                    <Link to="/dashboard/create-a-space">Create A Space</Link>
                </li>
                }
                {!isUserGuide && 
                <li>
                    <Link to="/dashboard/create-guide">Create Guide Profile</Link>
                </li>
                }
                </ul>
            </nav>
            <div class="user-profile-logout">
            <div className="profile-info">{user && <img className="profile_icon" src={profileIcon}></img>}
            {user.displayName || user.email || "(anonymous sign-in)"}
            </div>
            {user &&
            <>
            <button className="auth-btn" onClick={(e) => {handleLogout(); e.preventDefault();}}>Logout</button>
            </>
            }
            </div>
        </div>
        <div>
            {outlet || <>Error: Unknown dashboard page.</>}
        </div>

    </div>
        
    </>
    );
}
