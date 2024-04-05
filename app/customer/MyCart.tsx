'use client'

import { CarCard } from "@/app/components";
import { CartProps } from "@/app/types";
import Image from "next/image";

interface MyCartProps {
    allCars: CartProps[];
}

function MyCart({ allCars }: MyCartProps) {

    const isCarsEmpty = allCars.length < 1;

    return (
        <div className="mt-22 padding-x padding-y max-width" id="discover">
            <div className="home_text-container">
                <p className=" mt-12">Explore the cars you might like</p>
            </div>
            {!isCarsEmpty ? (
                <section>
                    <div className="home__cars-wrapper">
                        {allCars?.map((car) => (
                            <CarCard key={car?.combination_mpg} car={car} />
                        ))}
                    </div>
                </section>
            ) : (
                <h2 className="home__error-container mb-500">
                    <Image src="/illustration/pageNotFound.gif" width={200} height={100} unoptimized alt="data not found" className="object-contain" />
                    <h2 className="text-black text-xl font-bold">Oops, no results</h2>
                </h2>
            )}
        </div>
    );
}

export default MyCart;
