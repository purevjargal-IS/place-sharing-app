import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegister = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const newUser = { id: Date.now().toString(), name, email, password, picture };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! Please log in.");
        setIsRegistering(false);
    };

    const handleLogin = () => {
        const userId = login(email, password);
        if (userId) {
            navigate(`/${userId}/places`);
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div>
            {isRegistering ? (
                <>
                    <h2>Register</h2>
                    <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input placeholder="Profile Picture URL" onChange={(e) => setPicture(e.target.value)} />
                    <button onClick={handleRegister}>Register</button>
                    <button onClick={() => setIsRegistering(false)}>Back to Login</button>
                </>
            ) : (
                <>
                    <h2>Login</h2>
                    <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={() => setIsRegistering(true)}>Register</button>
                </>
            )}
        </div>
    );
};

export default Auth;