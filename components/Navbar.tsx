"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { useCookie } from "@/hooks/useCookie";
const links = [ { name: "dashboard", id: "/dashboard" }, { name: "packages", id: "/packages" }, { name: "payment", id: "/payment" }, { name: "sign in", id: "/auth/sign-in" } ];

const Navbar = () => {
  const { getCookie } = useCookie("token");
  const [token, setToken] = React.useState<null | string>("");

  const router = useRouter();
  const handleSignOut = async () => {
    await fetch("/api/auth/sign-out").then((res) => {
      if(res.status === 200) {
        router.replace("/auth/sign-in");
      }
    });
  };
  React.useEffect(() => {
    const newToken = getCookie();
    setToken(newToken);
  }, [getCookie, token]);

  return (
    <nav className='grid grid-cols-2 gap-2 items-center w-full'>
      <div className='col-span-2 md:col-span-1 w-40 h-16 flex mr-auto relative'>
        <Image priority src="/logo.svg" fill alt="logo" />
      </div>
      <ul className="col-span-2 md:col-span-1 flex gap-2 ml-auto items-center">
        {links.map(item => (
          <li key={item.id}>
            <Link className="border-2 border-gray-800 p-2 block" href={item.id}>{item.name}</Link>
          </li>
        ))}
        {token ? 
          <li>
            <button className="border-2 border-gray-800 p-2 block" onClick={handleSignOut}>sign out</button> 
          </li>
          : null
        }
      </ul>
    </nav>
  );
};

export default Navbar;