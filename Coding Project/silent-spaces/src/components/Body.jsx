import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import "./body.scss"

export function Body() {
    return (
        <>
        <Header></Header>
        <main>
        <Outlet />
        </main>
        <footer></footer>
        </>
    )
}