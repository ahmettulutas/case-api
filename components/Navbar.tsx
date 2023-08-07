import Image from "next/image";
import Link from "next/link";
import React from "react";

const links = [{ name: "packages", id: "/packages" }, { name: "signup", id: "/" }, { name: "payment", id: "/payment" }];

const Navbar = () => {
  return (
    <div className='m-10 flex gap-2 items-center'>
      <div className='w-40 h-20 flex mr-auto relative'>
        <Image priority src="/logo.svg" fill alt="logo" />
      </div>
      {links.map(item => (
        <Link className="border-2 border-gray-800 p-2" key={item.id} href={item.id}>{item.name}</Link>
      ))}
    </div>
  );
};

export default Navbar;