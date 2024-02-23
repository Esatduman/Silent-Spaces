import logo from "@assets/SIlent-Spaces-New.png";
import { NavLink } from "./NavLink";
import { useContext } from "react";
import { Context } from "../AuthContext";
import { signOut, getAuth } from "firebase/auth";

const links = {
    "Home": "/home",
    "Dashboard": "/dashboard",
    "About": "/about",
}

export function Header() {
    const {user} = useContext(Context);

    const auth = getAuth();

    async function handleLogout() {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className="header">
            <img className="header-logo" src={logo}></img>
            <nav>
                <ul>
                {Object.entries(links).map(([key, val]) => <NavLink label={key} link={val}></NavLink>)}
                </ul>
            </nav>
            {user &&
            <button className="auth-btn" onClick={(e) => {handleLogout(); e.preventDefault();}}>Logout.</button>
            }
        </header>
    )
}