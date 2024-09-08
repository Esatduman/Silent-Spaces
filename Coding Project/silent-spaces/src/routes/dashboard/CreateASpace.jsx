import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, setDoc, doc, collection, writeBatch, arrayUnion, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "./CreateASpace.scss";
import { geohashForLocation } from 'geofire-common';
import { Context } from '../../components/AuthContext';
import useGeoLocation from '../../components/useGeoLocation';

export function CreateASpace() {
    const db = getFirestore();
    const storage = getStorage();
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const { getLocation, location, setLocation } = useGeoLocation();
    const { spaceId } = useParams();

    const [spaceName, setSpaceName] = useState("");
    const [spaceDisplayName, setSpaceDisplayName] = useState("");
    const [spaceDesc, setSpaceDesc] = useState("");
    const [spaceImgs, setSpaceImgs] = useState([]);
    const [spaceTags, setSpaceTags] = useState([]);
    const [imageUploads, setImageUploads] = useState([]);
    const [yourTag, setYourTag] = useState("");

    const builtInTags = {
        "quiet": "Noise Restrictions In-Place",
        "charging": "Charging Ports Available",
        "food": "Dining Services Available",
        "scheduled": "Closed/Open by a certain schedule.",
        "reserved": "Requires Reservation Beforehand",
        "wheelchair_acc": "Wheelchair Accessible",
    };

    useEffect(() => {
        if (spaceId) {
            fetchData(spaceId);
        }
    }, [spaceId]);

    const fetchData = async (spaceId) => {
        const docRef = doc(db, "spaces", spaceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const foundData = docSnap.data();
            loadSpace(foundData);
        } else {
            console.log("No document found");
        }
    };

    const loadSpace = (space) => {
        setSpaceName(space.name || "");
        setSpaceDisplayName(space.displayName || "");
        setSpaceDesc(space.desc || "");
        if (space.lat && space.lng) {
            setLocation({ latitude: space.lat, longitude: space.lng });
        }
        setSpaceImgs(space.imgs || []);
        setSpaceTags(space.tags || []);
    };

    const createSpace = async (space, loc) => {
        const geohash = geohashForLocation([loc.latitude, loc.longitude]);
        const newData = { ...space, geohash, lat: loc.latitude, lng: loc.longitude };

        try {
            if (spaceId) {
                const existingDocRef = doc(db, "spaces", spaceId);
                await setDoc(existingDocRef, newData);
                navigate(`/dashboard/spaceview/${spaceId}`);
            } else {
                const userDoc = doc(db, "users", user.uid);
                const spaceDoc = doc(collection(db, 'spaces'));
                const batch = writeBatch(db);
                batch.set(spaceDoc, newData);
                batch.update(userDoc, { spaces: arrayUnion(spaceDoc) });
                await batch.commit();
                navigate(`/dashboard/spaceview/${spaceDoc.id}`);
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const uploadImages = async () => {
        if (imageUploads.length === 0) return;

        try {
            const imageRequests = Array.from(imageUploads).map(file => {
                const imgsRef = ref(storage, `space-imgs/${spaceId}/${file.name}`);
                return uploadBytes(imgsRef, file);
            });

            const snapshots = await Promise.all(imageRequests);
            const urls = await Promise.all(snapshots.map(snapshot => getDownloadURL(snapshot.ref)));
            setSpaceImgs(urls);
            alert('Images uploaded!');
        } catch (err) {
            console.error(err);
            alert('Failed to upload images.');
        }
    };

    const addTag = (tag) => {
        if (tag && !spaceTags.includes(tag)) {
            setSpaceTags(prev => [...prev, tag]);
            setYourTag("");
        }
    };

    const removeTag = (tag) => {
        setSpaceTags(prev => prev.filter(t => t !== tag));
    };

    return (
        <form className="create-space" onSubmit={(e) => e.preventDefault()}>
            <h1>{spaceId ? 'Editing a Space' : 'Creating a Space'}</h1>

            <section>
                <label htmlFor="spaceName">Space ID:</label>
                <input
                    id="spaceName"
                    value={spaceName}
                    onChange={(e) => setSpaceName(e.target.value)}
                    type="text"
                    placeholder="A 'username' for your space."
                />
            </section>

            <section>
                <label htmlFor="spaceDisplayName">Display Name:</label>
                <input
                    id="spaceDisplayName"
                    value={spaceDisplayName}
                    onChange={(e) => setSpaceDisplayName(e.target.value)}
                    type="text"
                    placeholder="A longer form of name"
                />
            </section>

            <section>
                <label htmlFor="spaceDesc">Description:</label>
                <textarea
                    id="spaceDesc"
                    value={spaceDesc}
                    onChange={(e) => setSpaceDesc(e.target.value)}
                    placeholder="A short description of your space."
                />
            </section>

            <section>
                <h4>Location:</h4>
                {location ? (
                    <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
                ) : (
                    <>
                        <p>No location</p>
                        <button type="button" onClick={getLocation}>Get Current Location</button>
                    </>
                )}
            </section>

            <section>
                <h4>Images</h4>
                <div className="images">
                    {spaceImgs.map((url, index) => (
                        <img key={index} src={url} alt={`Space image ${index}`} />
                    ))}
                    <input
                        type="file"
                        onChange={(event) => setImageUploads(event.target.files)}
                        multiple
                    />
                    <button type="button" onClick={uploadImages}>Upload Images</button>
                </div>
            </section>

            <section>
                <h4>Tags</h4>
                <ul className="tags">
                    {spaceTags.map((tag) => (
                        <li key={tag}>
                            <span className="tag edit" onClick={() => removeTag(tag)}>#{tag}</span>
                        </li>
                    ))}
                </ul>
                <input
                    value={yourTag}
                    onChange={(e) => setYourTag(e.target.value)}
                    type="text"
                    placeholder="#your_tag"
                />
                <button type="button" onClick={() => addTag(yourTag)}>Add tag</button>
                <div className="tag-helpers">
                    <span>Tags you might use</span>
                    <ul className="tags">
                        {Object.keys(builtInTags).filter(tag => !spaceTags.includes(tag)).map((tag) => (
                            <li key={tag}>
                                <span className="tag" onClick={() => addTag(tag)}>{builtInTags[tag]}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <div className="create-button">
                <button type="button" onClick={() => createSpace({
                    name: spaceName,
                    displayName: spaceDisplayName,
                    desc: spaceDesc,
                    owner: user.uid,
                    imgs: spaceImgs,
                    tags: spaceTags,
                }, location)}>
                    {spaceId ? 'Edit Space' : 'Create Space'}
                </button>
            </div>
        </form>
    );
}
