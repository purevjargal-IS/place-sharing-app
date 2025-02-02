import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserPlaces.css";

const UserPlaces = () => {
    const { uid } = useParams();
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const allPlaces = JSON.parse(localStorage.getItem("places")) || [];
        setPlaces(allPlaces.filter(place => place.userId === uid));
    }, [uid]);

    // const handleDelete = (placeId) => {
    //     const updatedPlaces = places.filter(place => place.id !== placeId);
    //     localStorage.setItem("places", JSON.stringify(updatedPlaces));
    //     setPlaces(updatedPlaces);
    // };

    return (
        <div className="user-places">
            <h2>Your Places</h2>
            <button onClick={() => navigate("/places/new")}>Add New Place</button>
            {places.length === 0 ? (
                <p>No places added yet.</p>
            ) : (
                places.map((place) => (
                    <div key={place.id} className="place-card">
                        <h3>{place.title}</h3>
                        <p>{place.description}</p>
                        <img src={place.image} alt={place.title} />
                        <div className="actions">
                            <button onClick={() => navigate(`/places/${place.id}`)}>View Details</button>
                            {/* <button onClick={() => navigate(`/places/update/${place.id}`)}>Update</button>
                            <button onClick={() => handleDelete(place.id)}>Delete</button> */}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default UserPlaces;