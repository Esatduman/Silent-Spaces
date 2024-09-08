import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams, Navigate, Link } from 'react-router-dom';
import { Context } from "../../components/AuthContext";

export function SpaceView() {
    const db = getFirestore();
    const { user } = useContext(Context);
    const { spaceId } = useParams();
    
    const [existingSpaceData, setExistingSpaceData] = useState(null);
    const [username, setUsername] = useState("");
    
    const fetchSpaceData = async (spaceId) => {
        const docRef = doc(db, "spaces", spaceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setExistingSpaceData({ ...docSnap.data(), id: docSnap.id });
        } else {
            console.log("No document found");
        }
    };

    const fetchUsername = async (uid) => {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        setUsername(userSnap.data().username);
    };

    useEffect(() => {
        if (spaceId) {
            fetchSpaceData(spaceId);
        }
    }, [spaceId]);

    useEffect(() => {
        if (existingSpaceData?.owner) {
            fetchUsername(existingSpaceData.owner);
        }
    }, [existingSpaceData]);

    if (!spaceId) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <article className="space-view">
            {existingSpaceData ? (
                <>
                    <h1 className="space-view-title">{existingSpaceData.displayName}</h1>
                    <hr className="space-view-divider" />
                    <h2 className="space-view-subtitle">
                        {existingSpaceData.name} by @{username}
                    </h2>
                    <ul className="space-view-tags">
                        {existingSpaceData.tags?.map(tag => (
                            <li key={tag} className="space-view-tag">#{tag}</li>
                        ))}
                    </ul>
                    <section className="space-view-images">
                        {existingSpaceData.imgs?.map((url, index) => (
                            <img key={index} src={url} alt={`Space image ${index + 1}`} />
                        ))}
                    </section>
                    <section className="space-view-description">
                        {existingSpaceData.desc}
                    </section>
                    {user.uid === existingSpaceData.owner && (
                        <Link to={`/dashboard/create-a-space/${existingSpaceData.id}`} className="space-view-edit-link">
                            Edit
                        </Link>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </article>
    );
}
