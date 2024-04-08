"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { jwtDecode } from 'jwt-decode';

import { CustomButton, Auth } from "..";
import { useRouter } from "next/navigation";
import { User } from "@/app/types";
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { RxAvatar } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState<User>();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const router = useRouter();

  const getAvatar = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`${SERVER_API_URL}/avatar/getAvatarById/${userId}`, {
        responseType: 'blob',
      });
      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        setAvatar(url);
      }
    } catch (e) {
      setAvatar(null);
    }
  }


  const handleChange = async (e: any) => {
    setProgress(true);
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      const response = await axiosInstance.patch(
        `${SERVER_API_URL}/avatar/update/${userLoggedIn?.sub}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      if (response.status === 200) {
        if (userLoggedIn)
          getAvatar(userLoggedIn.sub);
        toast.success("Profile image successfully changed.", {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      }
    } catch (e: any) {
      if (e.response.status === 404) {
        setAvatar(null);
      }
    }
    setProgress(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedData = jwtDecode(token) as User;
          if (decodedData) {
            setUserLoggedIn(decodedData);
            getAvatar(decodedData.sub);
          }
        } catch (e) {
          console.log("Token Error: ", e)
        }
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
    <>
      <header className={`w-full fixed z-10 transition-colors duration-300 ${scrolled ? "bg-gray-100 shadow" : ""}`} >
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
                <div className={`p-4 rounded-l-md  ${scrolled ? "bg-gray-100" : "bg-white"}`} >
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div className="bg-gray-300 text-white overflow-hidden rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-gray-600">
                      <label htmlFor="avatarInput">
                        {avatar && (
                          <Image src={avatar} alt="Avatar" width={50} height={50} className=" cursor-pointer " />
                        )}
                        {!avatar && (
                          <RxAvatar />
                        )}
                        <input id="avatarInput" accept="image/*" hidden type="file" onChange={handleChange} />
                      </label>
                    </div>
                    <div>
                      <div className="font-semibold">{userLoggedIn?.fullName}</div>
                      <div className="text-gray-600">{userLoggedIn?.email}</div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full flex items-center justify-center cursor-pointer rounded-r-md" >
                  <button className={`ext-black hover:bg-gray-300  font-bold w-full h-full px-5 rounded-r-md ${scrolled ? "bg-gray-100" : "bg-white"}`} onClick={logout}> <LuLogOut className="text-xl" /></button>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => setCurrentPage('signIn')}>
                  <CustomButton
                    title="Sign In"
                    btnType="button"
                    containerStyles={`text-primary-blue rounded-full  min-w-[130px] ${scrolled ? "bg-gray-100" : "bg-white"}`}
                    rightIcon=""
                    handleClick={toggleAuth}
                  />
                </button>
                <button onClick={() => setCurrentPage('signUp')}>
                  <CustomButton
                    title="Sign Up"
                    btnType="button"
                    containerStyles={`text-primary-blue rounded-full  min-w-[130px] ${scrolled ? "bg-gray-100" : "bg-white"}`}
                    rightIcon=""
                    handleClick={toggleAuth}
                  />
                </button>
              </div>
            )}
          </div>
        </nav>
        {isAuthOpen && <Auth isOpen={true} onClose={closeAuth} currentPage={currentPage} userLoggedIn={userLoggedIn} setCurrentPage={setCurrentPage} setUserLoggedIn={setUserLoggedIn} />}
      </header>
      <ToastContainer />
    </>
  );
};

export default Navbar;
