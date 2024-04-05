import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from 'next/navigation';

interface LoginProps {
    onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`${SERVER_API_URL}/auth/signin`, {
                email, password
            });
            if (response.status === 202) {
                localStorage.setItem('user', response.data);
                router.push('/customer')
            }

        } catch (error) {
            // console.log(error)
        }
        onClose();
    };

    return (
        <div className="p-10">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                />
                <input
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
