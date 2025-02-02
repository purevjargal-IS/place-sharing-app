import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./NewPlace.css";

const NewPlace = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [image, setImage] = useState("");

    const handleAddPlace = () => {
        if (!user) {
            alert("You must be logged in to add a place.");
            return;
        }

        const places = JSON.parse(localStorage.getItem("places")) || [];
        const newPlace = {
            id: Date.now().toString(),
            userId: user.id,
            title,
            description,
            address,
            location: { longitude, latitude },
            image,
        };

        places.push(newPlace);
        localStorage.setItem("places", JSON.stringify(places));
        navigate(`/${user.id}/places`);
    };

    return (
        <div className="form-container">
            <h2>Add New Place</h2>
            <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
            <input placeholder="Longitude" onChange={(e) => setLongitude(e.target.value)} />
            <input placeholder="Latitude" onChange={(e) => setLatitude(e.target.value)} />
            <input placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
            <button onClick={handleAddPlace}>Add Place</button>
        </div>
    );
};

export default NewPlace;