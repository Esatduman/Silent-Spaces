import { SpaceList } from "../../components/SpaceList";
import useGeoLocation from "../../components/useGeoLocation";
import "./findASpace.scss";

export function FindASpace() {
    const { getLocation, location, error } = useGeoLocation();

    const handleClick = () => {
        getLocation();
    };

    return (
        <div className="find-space-container">
            <h1 className="find-space-title">Nearby Spaces</h1>
            <hr className="find-space-divider" />
            <div className="location-section">
                <button className="location-button" onClick={handleClick}>Get Current Location</button>
                {error && <p className="location-error">Error: {error}</p>}
                {location && (
                    <p className="location-info">
                        Latitude: {location.latitude}, Longitude: {location.longitude}
                    </p>
                )}
            </div>
            <SpaceList />
        </div>
    );
}
