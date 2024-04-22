import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Context } from "../../components/AuthContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
            setExistingSpaceData({ ...foundData, id: docSnap.id });
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
        {existingSpaceData ? (<article>
            <h1>{existingSpaceData.displayName}</h1>
            <hr class="solid"></hr>
            <h2 class='space-view-h2'>{existingSpaceData.name}</h2>
            <section class='space-view-desc'>
                {existingSpaceData.desc}
            </section>
            {user.uid == existingSpaceData.owner && 
            <Link to={"/dashboard/create-a-space/" + existingSpaceData.id}>Edit</Link>}
        </article>)
        :
        <article>Loading...</article>
        }
    </>);
}