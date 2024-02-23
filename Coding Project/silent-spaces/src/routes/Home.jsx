import { signOut, getAuth } from "firebase/auth"
import { Header } from "../components/header/Header";

export function Home() {
    const auth = getAuth()

    async function handleLogout() {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }

    return <>
    <Header />
    <div>
        <h1>Home.</h1>
        <button onClick={() => {handleLogout()}}>Logout.</button>
    </div></>
}
