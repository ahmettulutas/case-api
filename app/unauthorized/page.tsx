import Link from "next/link";
import React from "react";

export default async function Page () {
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col gap-4">
      <h1>You are unauthorized to see this page. Please sign in first.</h1>
      <Link className="border-2 border-gray-800 p-2" href="/auth/sign-in">SIGN IN</Link>
    </div>
  );
};