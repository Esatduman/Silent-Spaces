import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import "./login.scss";

export function Login() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const auth = getAuth();
    const navigate = useNavigate();
    
    async function handleLogin() {
        signInWithEmailAndPassword(auth, email, pass)
        .then((user) => {
            console.log(user)
            navigate('/dashboard');
        })
        .catch((error) => {
            console.log(error)
        })
    };

    return (
        <>
        <div className="login-container">
            <div className ="logo">
                <img src="src/assets/Silent-Spaces-New.png"></img>
            </div>
            <h1>Login</h1>
            <form className ="login_form">
                <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="Email"></input>
                <input onChange={(e) => {setPass(e.target.value)}} type="text" placeholder="Password"></input>
                <button onClick={(e) => {
                    e.preventDefault()
                    handleLogin()
                    }}>Sign In</button>
            </form>
        </div>
        </>
    );
}
