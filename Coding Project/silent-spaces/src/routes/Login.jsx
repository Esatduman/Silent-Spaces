import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.scss";

export function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const auth = getAuth();
    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const user = await signInWithEmailAndPassword(auth, email, pass);
            console.log(user);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    return (
        <div className="login-container">
            <img src="src/assets/Maps.png" alt="Map" className="login-image" />
            <div className="login-form-container">
                <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <h4 className="login-title">Login</h4>
                    <p className="login-subtitle">Welcome to Silent Spaces!</p>
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
                    <button type="submit" className="btn-login">Login</button>
                    <p className="login-footer">
                        Don't have an account? <a href="/signup" className="signup-link">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
