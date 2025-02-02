import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PlaceDetail.css";

const PlaceDetail = () => {
    const { pid } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [image, setImage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const allPlaces = JSON.parse(localStorage.getItem("places")) || [];
        const foundPlace = allPlaces.find((p) => p.id === pid);
        if (foundPlace) {
            setPlace(foundPlace);
            setTitle(foundPlace.title);
            setDescription(foundPlace.description);
            setAddress(foundPlace.address);
            setLongitude(foundPlace.location.longitude);
            setLatitude(foundPlace.location.latitude);
            setImage(foundPlace.image);
        }
    }, [pid]);

    const handleUpdate = () => {
        const allPlaces = JSON.parse(localStorage.getItem("places")) || [];
        const updatedPlaces = allPlaces.map((p) =>
            p.id === pid
                ? { ...p, title, description, address, location: { longitude, latitude }, image }
                : p
        );
        localStorage.setItem("places", JSON.stringify(updatedPlaces));
        alert("Place updated successfully!");
        setIsEditing(false);
        setPlace({ ...place, title, description, address, location: { longitude, latitude }, image });
    };

    const handleDelete = () => {
        const allPlaces = JSON.parse(localStorage.getItem("places")) || [];
        const updatedPlaces = allPlaces.filter((p) => p.id !== pid);
        localStorage.setItem("places", JSON.stringify(updatedPlaces));
        alert("Place deleted successfully!");
        navigate(`/${place.userId}/places`);
    };

    if (!place) return <p>Place not found.</p>;

    return (
        <div className="place-detail">
            {isEditing ? (
                <>
                    <h2>Edit Place</h2>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                    <input value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                    <input value={image} onChange={(e) => setImage(e.target.value)} />
                    <button onClick={handleUpdate}>Save Changes</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <h2>{place.title}</h2>
                    <p>{place.description}</p>
                    <p><strong>Address:</strong> {place.address}</p>
                    <p><strong>Coordinates:</strong> {place.location.latitude}, {place.location.longitude}</p>
                    <img src={place.image} alt={place.title} />
                    <div className="actions">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PlaceDetail;