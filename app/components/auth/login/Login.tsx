"use client"

import React, { useState } from "react";
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { jwtDecode } from 'jwt-decode';
import { FaGoogle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { User } from "@/app/types";

interface LoginProps {
    onClose: () => void;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<User | undefined>>
}

const Login: React.FC<LoginProps> = ({ onClose, setUserLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
    };

    return (
        <div className="p-10">
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="w-full px-2 py-2 mb-2 bg-red-200">{error}</div>
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
                <div className="mb-2 text-right">
                    <a className="hover:underline cursor-pointer">forgot password?</a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>

                <div className="m-1 text-center">Or</div>
                <button
                    type="submit"
                    className=" flex flex-row justifyCenter gap-3 w-full bg-gray-200 hover:bg-gray-300 text-white font-bold py-2 px-4 mt-2 rounded"
                >
                    <FaGoogle /> Sign in with Google
                </button>
                <div className="m-1 text-right">
                    <a className="hover:underline cursor-pointer">
                        Don't have an account?</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
