import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export function Signup() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const auth = getAuth();
    
    async function handleSignUp() {
        createUserWithEmailAndPassword(auth, email, pass)
        .then((user) => {
            console.log(user)
        })
        .catch((error) => {
            console.log(error)
        })
    };

    return (
        <div>
            <h1>Sign Up.</h1>
            <form>
                <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="email address"></input>
                <input onChange={(e) => {setPass(e.target.value)}} type="text" placeholder="password"></input>
                <button onClick={(e) => {
                    e.preventDefault();
                    handleSignUp()
                    }}>Sign Up</button>
            </form>
        </div>
    );
}
