"use client"

import React, { useState } from "react";
import axios from "axios";
import SERVER_API_URL from "@/app/config";

interface ForgotProps {
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
}

const Forgot: React.FC<ForgotProps> = ({ email, setEmail, setCurrentPage }) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${SERVER_API_URL}/auth/forgotPassword`, {
                email
            });
            if (response.status === 202) {
                setCurrentPage("verificationCode")
                setSuccess("We have already sent an email via this email.");
                setError("");
            }

        } catch (e: any) {
            setSuccess("");
            if (e.code === 'ERR_NETWORK') {
                setError('Please check your internet connection');
            } else if (e.response && e.response.status === 404) {
                setError('No user found related by this email.');
            } else if ((e.response && e.response.status === 401) || (e.response && e.response.status === 400)) {
                setError('incorrect email format');
            } else if (e.response && e.response.status === 406) {
                setError('blocked user!');
            } else {
                console.log("error", e)
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
                {success && (
                    <div className="w-full px-2 py-2 mb-5 bg-green-200 text-center">{success}</div>
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


