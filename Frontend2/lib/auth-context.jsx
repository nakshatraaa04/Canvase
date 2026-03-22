"use client";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(undefined);
const MOCK_USERS = [
    {
        id: "1",
        name: "Alex Rivera",
        email: "artist@demo.com",
        role: "artist",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        bio: "Digital artist exploring the boundaries of imagination",
    },
    {
        id: "2",
        name: "Jordan Chen",
        email: "user@demo.com",
        role: "user",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
];
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const savedUser = localStorage.getItem("canvase_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);
    const login = async (email, _password) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const foundUser = MOCK_USERS.find((candidate) => candidate.email === email);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("canvase_user", JSON.stringify(foundUser));
            return;
        }
        const newUser = {
            id: Date.now().toString(),
            name: email.split("@")[0],
            email,
            role: "user",
        };
        setUser(newUser);
        localStorage.setItem("canvase_user", JSON.stringify(newUser));
    };
    const signup = async (name, email, _password, role) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            role,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        };
        setUser(newUser);
        localStorage.setItem("canvase_user", JSON.stringify(newUser));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("canvase_user");
    };
    return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
