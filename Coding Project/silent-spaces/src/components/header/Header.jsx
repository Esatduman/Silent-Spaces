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

const authLinks = {
    "Login": "/login",
    "Signup": "/signup",
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
        <header>
            <div className="logo" style={{'backgroundImage': `url(${logo})`}}></div>
            <nav>
                <ul>
                {Object.entries(links).map(([key, val]) => <NavLink key={key} label={key} link={val}></NavLink>)}
                {!user && Object.entries(authLinks).map(([key, val]) => <NavLink key={key} label={key} link={val}></NavLink>)}
                </ul>
            </nav>
            {user &&
            <button className="auth-btn" onClick={(e) => {handleLogout(); e.preventDefault();}}>Logout</button>
            }
        </header>
    )
}