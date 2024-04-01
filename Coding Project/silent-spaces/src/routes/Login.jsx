import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import "./Login.scss";

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
        <div class="container">
        <img src="src/assets/Maps.png" alt="Map" />
            <div class="row">
                <form action="#" class="form_active" id="login">
                    <h4>Login</h4>
                    <p>Welcome to Silent Spaces!</p>
                    <label for="email">Email Address</label>
                    <div class="pass-reset" onclick="activeInput(this)">
                        <input name="email" class="email" id="emailInput" placeholder="email" onChange={(e) => {setEmail(e.target.value)}} type="text"></input>
                    </div>
                    <label for="password">Password</label>
                    <div class="pass-reset" onclick="activeInput(this)">
                        <input class="password" name="password" id="password" placeholder="password " onChange={(e) => {setPass(e.target.value)}} type="text"></input>
                    </div>
                    <button class="btn-login" onClick={(e) => {
                    e.preventDefault()
                    handleLogin()
                    }}>Login</button>
                    <p>Don't have an account? <a onclick="changeToRegister()" id="changeToRegister">Sign up</a></p>
                </form>
            </div>
        </div>
        </>
    );
}
