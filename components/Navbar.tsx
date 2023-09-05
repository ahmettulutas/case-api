import Image from "next/image";
import Link from "next/link";
import React from "react";

const links = [{ name: "packages", id: "/packages" }, { name: "signup", id: "/" }, { name: "payment", id: "/payment" }];

const Navbar = () => {
  return (
    <nav className='grid grid-cols-2 gap-2 items-center w-full'>
      <div className='col-span-2 md:col-span-1 w-40 h-16 flex mr-auto relative'>
        <Image priority src="/logo.svg" fill alt="logo" />
      </div>
      <ul className="col-span-2 md:col-span-1 flex gap-2 ml-auto">
        {links.map(item => (
          <li key={item.id}>
            <Link className="border-2 border-gray-800 p-2" href={item.id}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;