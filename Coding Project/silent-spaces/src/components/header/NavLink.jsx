import { Link } from "react-router-dom"

export function NavLink({label, link}) {
    return (
        <li>
            <Link to={link}>{label}</Link>
        </li>
    )
}