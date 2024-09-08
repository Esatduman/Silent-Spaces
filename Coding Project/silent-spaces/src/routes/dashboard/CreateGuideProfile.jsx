import { getFirestore, doc, getDoc, writeBatch } from "firebase/firestore";
import { useContext, useState, useEffect, useCallback } from "react";
import { Context } from "../../components/AuthContext";
import './CreateGuideProfile.scss';

export function CreateGuideProfile() {
    const db = getFirestore();
    const { user } = useContext(Context);
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const checkUsernameAvailability = useCallback(async (username) => {
        if (username.length >= 3 && username.length <= 15) {
            const ref = doc(db, "usernames", username);
            const docRef = await getDoc(ref);
            const isAvailable = !docRef.exists();
            setError(isAvailable ? "Username is available." : "Username is not available.");
        } else {
            setError("Username must be at least 3 characters and at most 15 characters.");
        }
    }, [db]);

    useEffect(() => {
        const timer = setTimeout(() => {
            checkUsernameAvailability(username);
        }, 500);

        return () => clearTimeout(timer);
    }, [username, checkUsernameAvailability]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (error === "Username is available.") {
            try {
                const userDoc = doc(db, "users", user.uid);
                const usernameDoc = doc(db, "usernames", username);
                const batch = writeBatch(db);
                batch.set(userDoc, { username });
                batch.set(usernameDoc, { uid: user.uid });
                await batch.commit();
                setError("Username successfully set!");
            } catch (err) {
                setError("Failed to set username. Please try again.");
            }
        }
    };

    return (
        <div className="create-guide-profile">
            <h1>Set Guide Username</h1>
            <form id="guide-username" onSubmit={handleFormSubmit}>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="A specific id for your guide profile."
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
