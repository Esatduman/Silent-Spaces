

export function NavLink({label, link}) {
    return (
        <li>
            <a href={link}>{label}</a>
        </li>
    )
}