"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export interface User {
    id: number;
    name: string;
    email: string;
    diamonds: number;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    login: () => { },
    logout: () => { },
    fetchUser: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchUser = async () => {
        const token = Cookies.get('auth_token');
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.get('/user/me');
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user context', error);
            setUser(null);
            Cookies.remove('auth_token');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = (token: string, userData: User) => {
        Cookies.set('auth_token', token, { expires: 7 }); // Store token for 7 days
        setUser(userData);
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (e) {
            console.error("Logout error", e);
        } finally {
            Cookies.remove('auth_token');
            setUser(null);
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
