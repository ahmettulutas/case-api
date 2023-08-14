"use client";
import React from "react";

import ActionButton, { methods } from "@/components/ActionButton";
import JsonContainer from "@/components/JsonContainer";

/* import { generateDummyPackageItem } from "@/helpers/generateFakePackage"; */

export default function Packages() {

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [packageId, setPackageId] = React.useState("");
  const [bulkData, setBulkData] = React.useState("");
  const [singleData, setSingleData] = React.useState("");

  // UNCOMMENT THE FORM BELOW TO ADD MORE PACKAGES
  /* 
    const handlePost = async (e: React.FormEvent) => {
      e.preventDefault();
    
      if (!code) {
        setError("Please fill in the token field");
      }
      else {
        try {
          setError("");
          setLoading(true);
          await fetch("/api/packages", {
            method: "POST",
            body: JSON.stringify({ ...dummyData, code })
          });
        } catch (err: any) {
          throw new Error(err);
        }
        setLoading(false);
      };
    }; */

  const handleGetAllData = async () => {
    setLoading(true);
    await fetch("/api/packages").then((res) => res.json()).then(data => {
      setBulkData(data);
      setLoading(false);
    });
  };

  const handleGetById = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageId) {
      setError("Please provide a package id");
    }
    else {
      try {
        setError("");
        setLoading(true);
        await fetch(`/api/packages/${packageId}`).then(res => res.json()).then(data => {
          setSingleData(data);
        });
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    };
  };

  return (
    <div className='flex flex-col gap-8 m-10'>
      <h1 className='text-center text-bold text-violet-900'>TEST PACKAGES ENDPOINTS</h1>
      {/* UNCOMMENT THE FORM BELOW TO ADD MORE PACKAGES  */}
      {/*       
      <form onSubmit={handlePost} className='flex flex-col gap-4'> 
        <input name="password" type="password" className="border-2 border-gray-800 p-2" onChange={handleChange} placeholder='password' />
        <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" type="submit">POST PACKAGE WITH RANDOM DATA</button>
      </form> 
      */}
      <div className='flex flex-col gap-4'>
        <ActionButton method={methods.get} url={"/api/packages"} onClick={handleGetAllData} />
        {bulkData ? <JsonContainer formattedJSON={JSON.stringify(bulkData, null, 2)} /> : null}
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleGetById}>
        <input
          value={packageId}
          name="packageId"
          type="text"
          className="border-2 border-gray-800 p-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPackageId(e.target.value)}
          placeholder='Enter Package Id'
        />
        <ActionButton type="submit" method={methods.get} url={"/api/packages/${packageId}"} />
        {singleData ? <JsonContainer formattedJSON={JSON.stringify(singleData, null, 2)} /> : null}
      </form>
      <div className='flex flex-col gap-2'>
        {loading ? <span>Loading...</span> : null}
        {error ? <JsonContainer formattedJSON={JSON.stringify(error, null, 2)} /> : null}
      </div>
    </div>
  );
}
