"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomButton, Auth } from "..";

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('')

  const toggleAuth = () => {
    setIsAuthOpen(!isAuthOpen);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

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
        <div className="flex flex-row justifyCenter">
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
      </nav>
      {isAuthOpen && <Auth isOpen={true} onClose={closeAuth} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </header>
  );
};

export default Navbar;
