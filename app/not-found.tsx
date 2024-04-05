import Image from 'next/image';
import React from 'react';

const PageNotFound = () => {
    return (
        <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-center h-screen">
                <Image src="/illustration/pageNotFound.gif" width={500} height={500} unoptimized alt="data not found" className="object-contain" />
                <h1 className="text-4xl font-bold">
                    404 | Page Not Found | Try Again
                </h1>
            </div>
        </div>
    );
};

export default PageNotFound;
