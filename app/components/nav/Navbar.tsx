"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { jwtDecode } from 'jwt-decode';

import { CustomButton, Auth } from "..";
import { useRouter } from "next/navigation";
import { User } from "@/app/types";


const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState<User | undefined>();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedData = jwtDecode(token) as User;
        if (decodedData) {
          setUserLoggedIn(decodedData);
        }
      }
    }
  }, []);

  const toggleAuth = () => {
    setIsAuthOpen(!isAuthOpen);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const logout = () => {
    setUserLoggedIn(undefined);
    localStorage.clear();
    router.push("/")
  }

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/icon/logo.svg"
            alt="awesome cars"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>
        <div className="flex flex-row justify-center">
          {userLoggedIn ? (
            <div className="flex flex-row justify-center">
              <div className="p-4 bg-white rounded-l-md">
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center">Avatar</div>
                  <div>
                    <div className="font-semibold">{userLoggedIn?.fullName}</div>
                    <div className="text-gray-600">{userLoggedIn?.email}</div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full flex items-center justify-center rounded-r-md cursor-pointer" >
                <button className="ext-black  bg-white hover:bg-gray-300  font-bold w-full h-full px-5" onClick={logout}> <LuLogOut className="text-xl" /></button>
              </div>
            </div>
          ) : (
            <div>
              <button onClick={() => setCurrentPage('signIn')}>
                <CustomButton
                  title="Sign In"
                  btnType="button"
                  containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                  rightIcon=""
                  handleClick={toggleAuth}
                />
              </button>
              <button onClick={() => setCurrentPage('signUp')}>
                <CustomButton
                  title="Sign Up"
                  btnType="button"
                  containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                  rightIcon=""
                  handleClick={toggleAuth}
                />
              </button>
            </div>
          )}
        </div>
      </nav>
      {isAuthOpen && <Auth isOpen={true} onClose={closeAuth} currentPage={currentPage} setCurrentPage={setCurrentPage} setUserLoggedIn={setUserLoggedIn} />}
    </header>
  );
};

export default Navbar;
