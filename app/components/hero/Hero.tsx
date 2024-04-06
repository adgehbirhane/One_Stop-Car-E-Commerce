"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CustomButton } from "..";
import Link from "next/link";

const Hero = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setUser(token);
      }
    }
  }, []);

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Drive into Savings: Your One-Stop Car E-Commerce!
        </h1>
        <p className="hero__subtitle">
          Rev up your savings and streamline your car-buying experience with our comprehensive, one-stop online platform.
        </p>
        <div className="flex flex-row gap-5">
          <Link href="/cars" className="">
            <CustomButton
              title="Explore Cars"
              containerStyles="bg-primary-blue text-white rounded-full mt-10 transition-all duration-300 hover:text-black hover:bg-light-blue"
              rightIcon={""}
            />
          </Link>
          {user && (
            <Link href="/customer" className="">
              <CustomButton
                title="My Carts"
                containerStyles="bg-primary-blue text-white rounded-full mt-10 transition-all duration-300 hover:text-black hover:bg-light-blue"
                rightIcon={""}
              />
            </Link>
          )}
        </div>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/illustration/hero.png" alt="hero" fill className="object-contain" />
          <div className="hero__image-overlay" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
