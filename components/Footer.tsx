import React from "react";
import Image from "next/image";
import Link from "next/link"; 

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between  sm:px-16 px-6 py-10">
        <div>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={118}
              height={18}
              className="object-contain"
            />
          </Link>
        </div>
        <div>
          <p className="text-base text-gray-700">Awesome Cars, 2025</p>
          <p className="text-base text-gray-700">&copy; All rights reserved</p>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <Link href="https://www.linkedin.com/in/adgehbirhane" target="_blank">
            <Image
              src="/linkedin.svg"
              alt="linked in logo"
              width={20}
              height={20}
            />
          </Link>
          <Link href="https://twitter.com/adgehbirhane" target="_blank">
            <Image
              src="/twitter.svg"
              alt="twitter in logo"
              width={20}
              height={20}
            />
          </Link>
          <Link href="https://github.com/adgehbirhane" target="_blank">
            <Image
              src="/github.svg"
              alt="github in logo"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
