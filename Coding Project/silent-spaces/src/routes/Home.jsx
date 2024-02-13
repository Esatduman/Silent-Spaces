import { signOut, getAuth } from "firebase/auth"
import logo from "../assets/SIlent-Spaces-New.png";

export function Home() {
    const auth = getAuth()

    async function handleLogout() {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }

    return <div>
        <h1>Home.</h1>
        <img className="header-logo" src={logo}></img>
        <button onClick={() => {handleLogout()}}>Logout.</button>
    </div>
}
