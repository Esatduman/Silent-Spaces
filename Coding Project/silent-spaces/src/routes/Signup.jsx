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
        try {
            const user = await createUserWithEmailAndPassword(auth, email, pass);
            console.log(user);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    return (
        <div className="login-container">
            <img src="src/assets/Maps.png" alt="Map" className="login-image" />
            <div className="login-form-container">
                <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
                    <h4 className="login-title">Sign Up</h4>
                    <label htmlFor="email" className="login-label">Email Address</label>
                    <input
                        name="email"
                        id="email"
                        className="login-input"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                    <label htmlFor="password" className="login-label">Password</label>
                    <input
                        name="password"
                        id="password"
                        className="login-input"
                        placeholder="Password"
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        required
                    />
                    <button type="submit" className="btn-login">Sign Up</button>
                    <p className="login-footer">
                        Do you have an account? <a href="/login" className="signup-link">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
