import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

import { Package } from "../page";


async function getData(id: string | number): Promise<Package> {
  const url = `https://paramfe-case-backend.vercel.app/api/packages/${id}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

type Params = {
  params: {
    id: string
  }
}
export default async function Page({ params }: Params) {
  const item = await getData(params.id);
  return (

    <div className="grid grid-cols-2 gap-8 m-10">
      <div className="relative w-30 h-30 col-span-2 md:col-span-1">
        <Image alt="item" src={item.imagePath} fill />
      </div>
      <div className="flex flex-col w-30 h-30 col-span-2 md:col-span-1">
        <h1>{item.name}</h1>
        <span>{item.amount}</span>
        <ul>{item.details.map(item => <li key={item}>{item}</li>)}</ul>
        <ul>{item.tags.map(item => <li key={item}>{item}</li>)}</ul>
        <span>{item.amount}</span>
      </div>
    </div>
  );
}

