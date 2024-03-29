import logo from "@assets/SIlent-Spaces-New.png";
import { NavLink } from "./NavLink";
import { useContext } from "react";
import { Context } from "../AuthContext";
import { getAuth } from "firebase/auth";

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

    return (
        <header>
            <div className="logo" style={{'backgroundImage': `url(${logo})`}}></div>
            <nav>
                <ul>
                {Object.entries(links).map(([key, val]) => <NavLink key={key} label={key} link={val}></NavLink>)}
                {!user && Object.entries(authLinks).map(([key, val]) => <NavLink key={key} label={key} link={val}></NavLink>)}
                </ul>
            </nav>
        </header>
    )
}