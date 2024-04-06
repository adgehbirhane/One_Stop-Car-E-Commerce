"use client"

import React, { useState } from "react";
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { User } from "@/app/types";

interface ChangePasswordProps {
    onClose: () => void;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<User | undefined>>
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose, setUserLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Password confirmation error!');
            return;
        }
        try {
            const response = await axiosInstance.post(`${SERVER_API_URL}/auth/signin`, {
                email, password
            });
            if (response.status === 202) {
                const user = response.data;
                localStorage.setItem("token", user.token)
                const decodedData = jwtDecode(user.token) as User;
                if (decodedData) {
                    setUserLoggedIn(decodedData);
                }
                router.push('/customer')
                onClose();
            }

        } catch (e: any) {
            if (e.code === 'ERR_NETWORK') {
                setError('Please check your internet connection');
            } else if (e.response && e.response.status === 404) {
                setError('No user found related by this email.');
            } else if ((e.response && e.response.status === 401) || (e.response && e.response.status === 400)) {
                setError('incorrect email or password');
            } else if (e.response && e.response.status === 406) {
                setError('blocked user!');
            } else {
                setError('unKnown error, please refresh and try again!');
            }
        }
        setLoading(false);
    };

    return (
        <div className="p-10" style={{ minWidth: 500, minHeight: 450 }}>
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="w-full px-2 py-2 mb-5 bg-red-200 text-center">{error}</div>
                )}
                <input
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                />
                <input
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                />
                <input
                    required
                    type="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                />
                <button
                    disabled={loading}
                    type="submit"
                    className={`flex justify-center items-center w-full ${loading ? "bg-gray-300" : "bg-blue-500  hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`}
                >
                    {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>}
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
