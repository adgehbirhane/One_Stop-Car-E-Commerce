'use client'

import { CartProps } from "@/app/types";
import Image from "next/image";
import { CartCarCard, CustomButton } from "../components";
import Link from "next/link";

interface MyCartProps {
    allCars: CartProps[];
}

function MyCart({ allCars }: MyCartProps) {

    const isCarsEmpty = allCars.length < 1;

    return (
        <div className="mt-22 padding-x padding-y max-width" id="discover">
            <div className="home_text-container">
                <div className="mt-14">Explore the cars you might like</div>
            </div>
            {!isCarsEmpty ? (
                <section>
                    <div className="home__cars-wrapper">
                        {allCars?.map((car) => (
                            <CartCarCard key={car?.combination_mpg} car={car} />
                        ))}
                    </div>
                    <div className="w-full flex-center gap-5 mt-10">
                        <Link href="/cars" className="">
                            <CustomButton
                                title="Explore All Cars"
                                containerStyles="bg-primary-blue text-white rounded-full mt-10 transition-all duration-300 hover:text-black hover:bg-light-blue"
                                rightIcon={""}
                            />
                        </Link>
                    </div>
                </section>
            ) : (
                <h2 className="home__error-container mb-500">
                    <Image src="/illustration/pageNotFound.gif" width={200} height={100} unoptimized alt="data not found" className="object-contain" />
                    <h2 className="text-black text-xl font-bold">Oops, You have no product in the cart</h2>
                </h2>
            )}
        </div>
    );
}

export default MyCart;
