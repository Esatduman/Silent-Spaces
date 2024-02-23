import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./AuthContext";
import { Header } from "./header/Header";

export function Body({children}) {
    return (
        <>
        <Header></Header>
        <main>
        {children}
        </main>
        <footer></footer>
        </>
    )
}