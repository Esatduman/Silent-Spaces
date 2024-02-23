import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";

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