import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Context } from "../../components/AuthContext";
import { Navigate } from "react-router-dom";

export function SpaceView() {
    const db = getFirestore();
    const { user } = useContext(Context);
    const { spaceId } = useParams();

    const fetchData = async (spaceId) => {
        const docRef = doc(db, "spaces", spaceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const foundData = docSnap.data();
            console.log("Document data:", foundData);
            setExistingSpaceData(foundData);
        } else {
            console.log("No doc found");
        }
    };

    const [existingSpaceData, setExistingSpaceData] = useState({});

    if (spaceId) {
        useEffect(() => {
            fetchData(spaceId);
        }, []);
    } else {
        return <Navigate to="/dashboard" replace></Navigate>;
    }

    return (<>
        <section>
            {JSON.stringify(existingSpaceData)}
        </section>
    </>);
}