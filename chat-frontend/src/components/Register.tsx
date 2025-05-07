import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(username, email, password, profilePicture || undefined);
        navigate('/login');
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full p-2 border"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border"
                />
                <input
                    type="file"
                    onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                    className="w-full p-2 border"
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;