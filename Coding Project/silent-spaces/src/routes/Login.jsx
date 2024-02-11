import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export function Login() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const auth = getAuth();
    const navigate = useNavigate();
    
    async function handleLogin() {
        signInWithEmailAndPassword(auth, email, pass)
        .then((user) => {
            console.log(user)
            navigate('/home');
        })
        .catch((error) => {
            console.log(error)
        })
    };

    return (
        <div>
            <h1>Login.</h1>
            <form>
                <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="email address"></input>
                <input onChange={(e) => {setPass(e.target.value)}} type="text" placeholder="password"></input>
                <button onClick={(e) => {
                    e.preventDefault()
                    handleLogin()
                    }}>Sign In</button>
            </form>
        </div>
    );
}
