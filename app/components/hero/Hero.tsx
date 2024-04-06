"use client";
import Image from "next/image";
import { CustomButton } from "..";
import Link from "next/link";

const Hero = () => {
  const user = localStorage.getItem("token");
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Find, book or rent a car -- quickly and easily!
        </h1>
        <p className="hero__subtitle">
          Streamline your car rental experience with out effortless process
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
