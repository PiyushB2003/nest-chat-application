import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
    user: { id: number; username: string } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, email: string, password: string, profilePicture?: File) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ id: number; username: string } | null>(null);

    const login = async (email: string, password: string) => {
        const response = await axios.post('http://localhost:3000/auth/login', { email, password });
        localStorage.setItem('token', response.data.access_token);
        setUser({ id: 1, username: 'user' }); // Simplified
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const register = async (username: string, email: string, password: string, profilePicture?: File) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        if (profilePicture) formData.append('profilePicture', profilePicture);
        await axios.post('http://localhost:3000/auth/register', formData);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setUser({ id: 1, username: 'user' }); // Simplified
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
};