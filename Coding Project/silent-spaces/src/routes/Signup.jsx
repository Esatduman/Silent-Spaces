import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

export function Signup() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const auth = getAuth();
    const navigate = useNavigate();
    
    async function handleSignUp() {
        createUserWithEmailAndPassword(auth, email, pass)
        .then((user) => {
            console.log(user);
            navigate("/dashboard");
        })
        .catch((error) => {
            console.log(error)
            alert(error.message);
        })
    };

    return (
        <>
        <head>
            <meta charset="UTF-8"></meta>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet"></link>
        </head>
        <div class="container">
            <div class="row">
                <form action="#" class="form active" id="register">
                    <h2>Sign Up</h2>
                    <label for="email">Email Address</label>
                    <div class="pass-reset" onclick="activeInput(this)">
                        <input name="email" class="email" id="emailInput" placeholder="email" onChange={(e) => {setEmail(e.target.value)}} type="text"></input>
                    </div>
                    <label for="password">Password</label>
                    <div class="pass-reset" onclick="activeInput(this)">
                        <input class="password" name="password" id="password" placeholder="password" onChange={(e) => {setPass(e.target.value)}} type="text"></input>
                    </div>
                    <button class="btn btn-login" onClick={(e) => {
                    e.preventDefault();
                    handleSignUp();
                    }}>Sign Up</button>
                    <p>Do you have an account? <a onclick="changeToLogin()" id="chnageToLogin">Sign in</a></p>
                    
                </form>
            </div>
        </div>
        </>
    );
}
