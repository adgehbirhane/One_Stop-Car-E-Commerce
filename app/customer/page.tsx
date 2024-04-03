"use client"

import { useEffect, useState } from "react";

import axiosInstance from "../api";
import SERVER_API_URL from "../config";
import MyCart from "./MyCart";

function Cars() {

    const [allCars, setAllCars] = useState([]);

    useEffect(() => {
        const getAllCars = async () => {
            try {
                const response = await axiosInstance.get(`${SERVER_API_URL}/product/findAllCart`);
                if (response.status === 200) {
                    setAllCars(response.data);
                    console.log('res: ', response.data)
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (typeof window !== 'undefined') {
            getAllCars();
        }
    }, []);

    return (
        <div>
            <MyCart allCars={allCars} />
        </div>
    );
}

export default Cars;
