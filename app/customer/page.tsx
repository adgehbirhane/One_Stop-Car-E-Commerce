"use client"

import { useEffect, useState } from "react";

import axiosInstance from "../api";
import SERVER_API_URL from "../config";
import MyCart from "./MyCart";
import { User } from "../types";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

function Cars() {

    const [allCars, setAllCars] = useState([]);

    const router = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push("/");
            }
        }
    }, []);

    useEffect(() => {
        const getAllCars = async (userId: string) => {
            try {
                const response = await axiosInstance.get(`${SERVER_API_URL}/product/cartsByUserId/${userId}`);
                if (response.status === 200) {
                    setAllCars(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (typeof window !== 'undefined') {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decodedData = jwtDecode(token) as User;
                    if (decodedData) {
                        getAllCars(decodedData.sub)
                    }
                }
            } catch (e) {
                // console.log(e);
            }
        }
    }, []);

    return (
        <div>
            <MyCart allCars={allCars} />
        </div>
    );
}

export default Cars;
