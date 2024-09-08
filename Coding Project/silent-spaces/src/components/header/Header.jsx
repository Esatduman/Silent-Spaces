import logo from "@assets/SIlent-Spaces-New.png";
import { useContext } from "react";
import { Context } from "../AuthContext";
import "./Header.scss";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

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
    const { user } = useContext(Context);

    // const auth = getAuth();

    return (
        <nav>
            <div className="auth-links">
                <img className="logo" src={logo} />
                {Object.entries(links).map(([key, val]) => {
                    return (
                        <button key={key}>
                            <Link to={val}>{key}</Link>
                        </button>
                    )
                    // return <NavLink className="nav-link" key={key} label={key} link={val} />
                })}
            </div>
            {!user &&
                <div className="auth-links">
                    {Object.entries(authLinks).map(([key, val]) => (
                        <button key={key}>
                            <Link to={val}>{key}</Link>
                        </button>
                    ))}
                </div>
            }
        </nav>
    )
}