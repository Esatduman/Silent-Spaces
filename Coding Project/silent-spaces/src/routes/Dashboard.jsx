import { useOutlet } from "react-router-dom";
import profileIcon from "@assets/login-user-name-1 1.png"

export function Dashboard() {
    const outlet = useOutlet();

    return (
    <>
    <div>
    
        <h1>Dashboard.</h1>
        {/* <img className="profile_icon" src={profileIcon}></img>  This should only be visible if the user is signed and current user is fetched - Esat Duman*/}
        <div>
            {outlet || <>Error: Unknown dashboard page.</>}
        </div>
    </div>
    </>
    );
}
