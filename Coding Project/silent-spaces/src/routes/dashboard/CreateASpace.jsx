import { getFirestore, setDoc, doc, collection, writeBatch, arrayUnion, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { Context } from "../../components/AuthContext";
import useGeoLocation from "../../components/useGeoLocation";
import { geohashForLocation } from "geofire-common";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export function CreateASpace() {
    const db = getFirestore();
    const storage = getStorage();
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const { getLocation, location, error, setLocation } = useGeoLocation();
    const { spaceId } = useParams();

    const fetchData = async (spaceId) => {
        const docRef = doc(db, "spaces", spaceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const foundData = docSnap.data();
            console.log("Document data:", foundData);
            setExistingSpaceData(foundData);
            // var imgListRef = ref(storage, `/space-imgs/${spaceId}`);
            // listAll(imgListRef).then((response) => {
            //     response.items.forEach((item) => {
            //         getDownloadURL(item).then((downloadUrl) => {
            //             setSpaceImgs((prev) => [...prev, downloadUrl]);
            //         });
            //     });
            // });
        } else {
            console.log("No doc found");
        }
    };

    async function createSpace(space, loc) {
        const geohash = geohashForLocation([loc.latitude, loc.longitude]);
        const newData = {
            ...space,
            geohash,
            lat: loc.latitude,
            lng: loc.longitude,
        };
        console.log(newData);
        if (spaceId) { // Editing
            const existingDocRef = doc(db, "spaces", spaceId);
            await setDoc(existingDocRef, newData).then(() => {
                console.log("Success");
                navigate("/dashboard/spaceview/" + spaceId);
            }).catch((err) => {
                console.log(err);
            });
        } else {
            const userDoc = doc(db, "users", user.uid);
            const spaceDoc = doc(collection(db, 'spaces'));
            const batch = writeBatch(db);
            batch.set(spaceDoc, newData);
            batch.update(userDoc, {spaces: arrayUnion(spaceDoc)});
            await batch.commit().then(() => {
                console.log("Success");
                navigate("/dashboard/spaceview/" + spaceDoc.id);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const [existingSpaceData, setExistingSpaceData] = useState({});
    const [spaceName, setSpaceName] = useState("");
    const [spaceDisplayName, setSpaceDisplayName] = useState("");
    const [spaceDesc, setSpaceDesc] = useState("");
    const [spaceImgs, setSpaceImgs] = useState([]);

    if (spaceId) {
        useEffect(() => {
            fetchData(spaceId);
        }, []);
    }

    useEffect(() => {
        if(existingSpaceData.name)
            setSpaceName(existingSpaceData.name);
        if(existingSpaceData.displayName)
            setSpaceDisplayName(existingSpaceData.displayName);
        if(existingSpaceData.desc)
            setSpaceDesc(existingSpaceData.desc);
        if(existingSpaceData.lat && existingSpaceData.lat)
            setLocation({latitude: existingSpaceData.lat, longitude: existingSpaceData.lng});
        if(existingSpaceData.imgs)
            setSpaceImgs(existingSpaceData.imgs);
    }, [existingSpaceData]);

    const [imageUploads, setImageUploads] = useState([]);
    const uploadImages = () => {
        if (imageUploads.length == 0) return;
        const imageRequests = Array.from(imageUploads).map(f => {
            const imgsRef = ref(storage, `space-imgs/${spaceId}/${f.name}`);
            return uploadBytes(imgsRef, f);
        });
        Promise.all(imageRequests).then((snapshots) => {
            Promise.all(snapshots.map((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })).then(results => {
                alert('Images uploaded!');
                setSpaceImgs(results);
                console.log(results);
            });
        });
    };
    return (<>
    
    <form className='create-space'>
    {spaceId ? (<h1>Editing a Space</h1>)
    : (<h1>Creating a Space</h1>)}
        <section>
            <h4>Space ID:</h4>
            <input value={spaceName} onChange={(e) => {setSpaceName(e.target.value)}} type="text" placeholder="A 'username' for your space."></input>
        </section>
        <section>
            <h4>Display Name:</h4>
            <input value={spaceDisplayName} onChange={(e) => {setSpaceDisplayName(e.target.value)}} type="text" placeholder="A longer form of name"></input>
        </section>
        <section>
            <h4>Description:</h4>
            <textarea value={spaceDesc} onChange={(e) => {setSpaceDesc(e.target.value)}} placeholder="A short description of your space."></textarea>
        </section>
        <section>
            <h4>Location:</h4>
            {location ? (
                <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
            ) : (
                <>No location <br></br><button onClick={(e) => {getLocation(); e.preventDefault()}}>Get Current Location</button></>
            )}
        </section>
        <br />
        <section>
            <h4>Images</h4> 
            <div className="images">
            {spaceImgs.map((url) => {
                return <img src={url}/>;
            })}
            <input type="file" onChange={(event) => {setImageUploads(event.target.files);}}></input>
            <button onClick={(e) => {e.preventDefault(); uploadImages();}}>Upload Images</button>
            </div>
        </section>
        <div className='create-button'>
        <button onClick={(e) => {
            e.preventDefault();
            createSpace({
                name: spaceName,
                displayName: spaceDisplayName,
                desc: spaceDesc,
                owner: user.uid,
                imgs: spaceImgs,
            }, location);
            }}>
            {spaceId ? <>Edit Space</> : <>Create Space</>}
        </button>
        </div>
    </form>
    </>);
}