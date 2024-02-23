import logo from "@assets/SIlent-Spaces-New.png";
import { NavLink } from "./NavLink";

const links = {
    "Home": "/home",
    "Dashboard": "/dashboard",
    "About": "/about",
}

export function Header() {
    return (
        <header>
            <img className="header-logo" src={logo}></img>
            <nav>
                {Object.entries(links).map(([key, val]) => <NavLink label={key} link={val}></NavLink>)}
            </nav>
        </header>
    )
}