import { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { CarProps } from "@/app/types";
import { generateCarImageUrl } from "@/app/utils";
import axiosInstance from "../../api";
import SERVER_API_URL from "../../config";


interface CartCarDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    car: CarProps;
}

const CartCarDetails = ({ isOpen, closeModal, car }: CartCarDetailsProps) => {

    const cartId: string | undefined = car.id;
    const [loading, setLoading] = useState(false);

    const handleBuyCart = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(`${SERVER_API_URL}/order/payment/${cartId}`);
            if (response.status === 201) {
                const billUrl = response.data.bill_url;
                // console.log("bill: ", response.data.bill_url)
                // console.log("billUrl: ", billUrl)
                window.open(billUrl, '_blank');
                closeModal()
            }
        } catch (e: any) {
            if (e.code === 'ERR_NETWORK') {
                toast.error('Please check your internet connection');
            } else if (e.response && e.response.status === 406) {
                toast.error('user not found!');
            } else if (e.response && e.response.status === 500) {
                toast.error('Internal server Error, Hint: Chapa rule missed!');
            } else if (e.response && e.response.status === 404) {
                toast.error('cart not found!');
            } else {
                toast.error('unKnown error, please refresh and try again!');
            }
        }
        setLoading(false);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-out duration-300"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                                        onClick={closeModal}
                                    >
                                        <Image
                                            src="/icon/close.svg"
                                            alt="close"
                                            width={20}
                                            height={20}
                                            className="object-contain"
                                        />
                                    </button>

                                    <div className="flex-1 flex flex-col gap-3">
                                        <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                                            <Image
                                                src={generateCarImageUrl(car, "")}
                                                alt="car model"
                                                fill
                                                priority
                                                className="object-contain"
                                            />
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                                                <Image
                                                    src={generateCarImageUrl(car, "29")}
                                                    alt="car model"
                                                    fill
                                                    priority
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                                                <Image
                                                    src={generateCarImageUrl(car, "33")}
                                                    alt="car model"
                                                    fill
                                                    priority
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                                                <Image
                                                    src={generateCarImageUrl(car, "13")}
                                                    alt="car model"
                                                    fill
                                                    priority
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col gap-2">
                                        <h2 className="font-semibold text-xl capitalize">
                                            {car.make} {car.model}
                                        </h2>

                                        <div className="mt-3 flex flex-wrap gap-4">
                                            {Object.entries(car).map(([key, value]) => {

                                                const excludeKeys = ['id', 'updatedAt', 'status', 'userId', 'orderId', 'order'];

                                                if (!excludeKeys.includes(key)) {
                                                    return (
                                                        <div
                                                            className="flex justify-between gap-5 w-full text-right"
                                                            key={key}
                                                        >
                                                            <h4 className="text-grey capitalize">
                                                                {key.split("_").join(" ")}
                                                            </h4>
                                                            <p className="text-black-100 font-semibold">{value}</p>
                                                        </div>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })}

                                        </div>
                                        <div className="container">
                                            <button
                                                disabled={loading}
                                                type="submit"
                                                onClick={handleBuyCart}
                                                className={`flex justify-center items-center w-full ${loading ? "bg-gray-300" : "bg-blue-500  hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`}
                                            >
                                                {loading && <div className="animate-spin rounded-full  h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>}

                                                Buy this product
                                                <Image
                                                    src="/icon/cart.png"
                                                    alt="right icon"
                                                    className="object-contain"
                                                    width={20} height={20}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ToastContainer />
        </>
    );
}
export default CartCarDetails;
