import logo from "@assets/SIlent-Spaces-New.png";
import { NavLink } from "./NavLink";

const links = {
    "Home": "/home",
    "Dashboard": "/dashboard",
    "About": "/about",
}

export function Header() {
    return (
        <header class="header">
            <img className="header-logo" src={logo}></img>
            <nav>
                <ul>
                {Object.entries(links).map(([key, val]) => <NavLink label={key} link={val}></NavLink>)}
                </ul>
            </nav>
        </header>
    )
}