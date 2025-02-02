import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    return (
        <div>
            <h2>Registered Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => navigate("/authenticate")}>
                        <img src={user.picture} alt={user.name} width="50" />
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;