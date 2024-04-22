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
            loadSpace(foundData);
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
    const loadSpace = (space) => {
        if(space.name)
            setSpaceName(space.name);
        if(space.displayName)
          setSpaceDisplayName(space.displayName);
        if(space.desc)
            setSpaceDesc(space.desc);
        if(space.lat && space.lng)
            setLocation({latitude: space.lat, longitude: space.lng});
        if(space.imgs)
            setSpaceImgs(space.imgs);
        if(space.tags)
            setSpaceTags(space.tags);
    }

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
                alert(err.message);
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
                alert(err.message);
            });
        }
    }

    const [spaceName, setSpaceName] = useState("");
    const [spaceDisplayName, setSpaceDisplayName] = useState("");
    const [spaceDesc, setSpaceDesc] = useState("");
    const [spaceImgs, setSpaceImgs] = useState([]);
    const [spaceTags, setSpaceTags] = useState([]);

    if (spaceId) {
        useEffect(() => {
            fetchData(spaceId);
        }, []);
    }

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
    const [yourTag, setYourTag] = useState("");
    const builtInTags = {
        "quiet": "Noise Restrictions In-Place",
        "charging": "Charging Ports Available",
        "food": "Dining Services Available",
        "scheduled": "Closed/Open by a certain schedule.",
        "reserved": "Requires Reservation Beforehand",
        "wheelchair_acc": "Wheelchair Accessible",
    };
    const addTag = (tag) => {
        if(tag == "") return;
        if(spaceTags.includes(tag)) return;
        setSpaceTags(prev => [...prev, tag]);
    }
    const removeTag = (tag) => {
        setSpaceTags(prev => prev.filter(rhs => rhs != tag));
    }

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
            {spaceImgs ? spaceImgs.map((url) => {
                return <img src={url}/>;
            }) : <></>}
            <input type="file" onChange={(event) => {setImageUploads(event.target.files);}}></input>
            <button onClick={(e) => {e.preventDefault(); uploadImages();}}>Upload Images</button>
            </div>
        </section>
        <section>
            <h4>Tags</h4> 
            <ul className="tags">
            {spaceTags ? spaceTags.map((tag) => {
                return <span className="tag edit" onClick={(e) => {e.preventDefault(); removeTag(tag);}}>#{tag}</span>;
            }) : <></>}
            </ul>
            <input value={yourTag} onChange={(e) => {setYourTag(e.target.value)}} type="text" placeholder="#your_tag"></input>
            <button onClick={(e) => {e.preventDefault(); addTag(yourTag); setYourTag("");}}>Add tag</button>
            <div class="tag-helpers">
                <span>Tags you might use</span>
                <div class="dropdown-content">
                    <ul className="tags">
                    {Object.keys(builtInTags).filter(tag => !spaceTags.includes(tag)).map(
                        (tag) => <span className="tag" onClick={(e) => {e.preventDefault(); addTag(tag);}}>{builtInTags[tag]}</span>
                    )}
                    </ul>
                </div>
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
                tags: spaceTags,
            }, location);
            }}>
            {spaceId ? <>Edit Space</> : <>Create Space</>}
        </button>
        </div>
    </form>
    </>);
}