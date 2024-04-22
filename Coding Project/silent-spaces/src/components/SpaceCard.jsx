import { getFirestore, getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SpaceCard.scss";

export function SpaceCard({space, isSelected, distanceObj }) {
    const db = getFirestore();
    const [username, setUsername] = useState("");

    const retrieveUsername = async() => {
        const usernameRef = doc(db, "users", space.owner);
        const usernameSnap = await getDoc(usernameRef);
        setUsername(usernameSnap.data().username);
    }
    function handleClick(myLink){
        window.location.href=myLink;
    }

    useEffect(() => {
        retrieveUsername();
    }, []);
    return (<>
    {/* {JSON.stringify(space)} */}
    <div className={isSelected ? "space-card selected" : "space-card"} onClick={(e) => handleClick("/dashboard/spaceview/" + space.id)}>
        <span className="slug">@{username}:{space.name}</span>
        <br />
        {distanceObj && <span>({Math.trunc(distanceObj.dist * Math.pow(10, 2)) / Math.pow(10, 2)} miles away)</span>}
        <br />
        <span className="space-name">{space.displayName}</span>
        <ul className="tags">
        {space.tags ? space.tags.map((tag) => {
            return <span className="tag">#{tag}</span>;
        }) : <></>}
        </ul>
        {/* <Link to={"/dashboard/spaceview/" + space.id}>go to</Link> */}
    </div>
    </>);
}