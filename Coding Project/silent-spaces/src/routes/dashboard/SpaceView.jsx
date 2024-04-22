import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Context } from "../../components/AuthContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import StarRating from "./StarRating";

import { getStorage } from "firebase/storage";
import { ref } from "firebase/storage";


export function SpaceView() {
    const db = getFirestore();
    const storage = getStorage();
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

    const [username, setUsername] = useState("");
    const retrieveUsername = async (uid) => {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        setUsername(userSnap.data().username);
    }
    useEffect(() => {
        retrieveUsername(existingSpaceData.owner);
    }, [existingSpaceData]);

    if (spaceId) {
        useEffect(() => {
            fetchData(spaceId);
        }, []);
    } else {
        return <Navigate to="/dashboard" replace></Navigate>;
    }

    return (<>

        {existingSpaceData ? (<article>
            {/* <StarRating /> */}
            <h1>{existingSpaceData.displayName}</h1>
            <hr class="solid"></hr>
            <h2 class='space-view-h2'>{existingSpaceData.name} by @{username}</h2>
            <ul className="tags">
            {existingSpaceData.tags ? existingSpaceData.tags.map((tag) => {
                return <span className="tag">#{tag}</span>;
            }) : <></>}
            </ul>
            <section class='space-view-images'>
            {existingSpaceData.imgs ? 
            existingSpaceData.imgs.map(url => <><img key={url} src={url}></img></>)
            : <></>
            }
            </section>
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