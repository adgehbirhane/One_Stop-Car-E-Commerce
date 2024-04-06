"use client"

import React, { useState } from "react";
import axios from "axios";
import SERVER_API_URL from "@/app/config";
import { jwtDecode } from 'jwt-decode';
import { User } from "@/app/types";

interface ForgotProps {
    setUserLoggedIn: React.Dispatch<React.SetStateAction<User | undefined>>
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

const Forgot: React.FC<ForgotProps> = ({ setUserLoggedIn, setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${SERVER_API_URL}/auth/forgotPassword`, {
                email
            });
            if (response.status === 202) {
                const user = response.data;
                localStorage.setItem("token", user.token)
                const decodedData = jwtDecode(user.token) as User;
                if (decodedData) {
                    setUserLoggedIn(decodedData);
                    setCurrentPage("verificationCode")
                }
            }

        } catch (e: any) {
            if (e.code === 'ERR_NETWORK') {
                setError('Please check your internet connection');
            } else if (e.response && e.response.status === 404) {
                setError('No user found related by this email.');
            } else if ((e.response && e.response.status === 401) || (e.response && e.response.status === 400)) {
                setError('incorrect email format');
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
                <button
                    disabled={loading}
                    type="submit"
                    className={`flex justify-center items-center w-full ${loading ? "bg-gray-300" : "bg-blue-500  hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`}
                >
                    {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>}
                    Get verification code
                </button>
                <div className="m-1 my-2 text-right">
                    <a onClick={() => setCurrentPage("signIn")} className="hover:underline cursor-pointer text-blue"> Back!
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Forgot;


