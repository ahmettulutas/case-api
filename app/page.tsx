"use client";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Link className="border-2 border-gray-800 p-2" href="/auth/sign-in">START EXPLORING</Link>
    </div>
  );
}

