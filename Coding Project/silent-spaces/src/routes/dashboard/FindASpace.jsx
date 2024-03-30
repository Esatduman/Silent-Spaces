import { SpaceList } from "../../components/SpaceList";
import useGeoLocation from "../../components/useGeoLocation";

export function FindASpace() {

    const { getLocation, location, error } = useGeoLocation();

    const handleClick = () => {
        getLocation(); // Once button is pressed it will find your location fat arrow function thing. 
    };
    return (<>
    <h1>Find a Space!</h1>
    {/* <div>
                <button onClick={handleClick}>Get Current Location</button>
                {error && <p>Error: {error}</p>}
                {location && (
                    <p>
                        Latitude: {location.latitude}, Longitude: {location.longitude}
                    </p>
                )}
            </div> */}
    <SpaceList></SpaceList>
    </>);
}