"use client"

import React, { useEffect, useRef } from "react";
import Login from "./login/Login";
import SignUp from "./signUp/SignUp";
import { User } from "@/app/types";
import SignUpWithGoogle from "./signUp/SignUpWithGoogle";

interface AuthProps {
    isOpen: boolean;
    onClose: () => void;
    currentPage: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
    setUserLoggedIn: React.Dispatch<React.SetStateAction<User | undefined>>
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose, currentPage, setCurrentPage, setUserLoggedIn }) => {

    const authRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (authRef.current && !authRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50  p-15 flex justify-center items-center ${isOpen ? "" : "hidden"
                }`}
        >
            <div ref={authRef} className="bg-white rounded-lg">
                <div>
                    <button
                        onClick={() => setCurrentPage("signIn")}
                        className={currentPage === "signIn" ? "active-btn p-10 pb-5 hover:bg-gray-300 font-bold w-1/2" : "p-10 pb-5 text-white bg-gray-500 hover:bg-gray-300 font-bold w-1/2"}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setCurrentPage("signUp")}
                        className={currentPage === "signUp" || currentPage === "signUpWithGoogle" ? "active-btn p-10 pb-5 hover:bg-gray-300 font-bold w-1/2" : "p-10 pb-5 text-white bg-gray-500 hover:bg-gray-300 font-bold w-1/2"}
                    >
                        Sign Up
                    </button>
                </div>
                {currentPage === "signIn" && (
                    <Login onClose={onClose} setUserLoggedIn={setUserLoggedIn} setCurrentPage={setCurrentPage} />
                )}
                {currentPage === "signUp" && (
                    <SignUp onClose={onClose} setUserLoggedIn={setUserLoggedIn} setCurrentPage={setCurrentPage} />
                )}
                {currentPage === "signUpWithGoogle" && (
                    <SignUpWithGoogle onClose={onClose} setUserLoggedIn={setUserLoggedIn} setCurrentPage={setCurrentPage} />
                )}
            </div>
        </div>
    );
};

export default Auth;
