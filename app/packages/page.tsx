"use client";
import { generateDummyPackageItem } from '@/helpers/generateFakePackage';
import React from 'react';

export default function Packages() {

  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [packageId, setPackageId] = React.useState("");
  const [bulkData, setBulkData] = React.useState("");
  const [singleData, setSingleData] = React.useState("");

  const handleGetAllData = async () => {
    setLoading(true);
    await fetch("/api/packages").then((res) => res.json()).then(data => {
      setBulkData(data);
      setLoading(false);
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "password") {
      setCode(value);
    }
    else if (name === "packageId") {
      setPackageId(value);
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const fakeData = generateDummyPackageItem();
    if (!code) {
      setError("Please provide the code");
    }
    else {
      try {
        setError("");
        setLoading(true);
        await fetch("/api/packages", {
          method: "POST",
          body: JSON.stringify({ ...fakeData, code })
        })
      } catch (err: any) {
        throw new Error(err);
      }
      setLoading(false)
    };
  }
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
          setSingleData(data)
        })
      } catch (err: any) {
        throw new Error(err);
      }
      setLoading(false);
    };
  }

  return (
    <div className='flex flex-col gap-8 m-10'>
      <h1 className='text-center text-bold text-violet-900'>TEST PACKAGES</h1>
      <form onSubmit={handlePost} className='flex flex-col gap-4'>
        <input name="password" type="password" className="border-2 border-gray-800 p-2" onChange={handleChange} placeholder='password' />
        <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" type="submit">POST PACKAGE WITH RANDOM DATA</button>
      </form>
      <div className='flex flex-col gap-4'>
        <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" onClick={handleGetAllData}>TEST GET PACKAGES ENDPOINT</button>
        {bulkData ? <span className="inline-block mt-2">{JSON.stringify(bulkData)}</span> : null}
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleGetById}>
        <input name="packageId" type="text" className="border-2 border-gray-800 p-2" onChange={handleChange} placeholder='enter package id' />
        <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" type="submit">TEST GET PACKAGE BY ID</button>
        {singleData ? <span className="inline-block mt-2">{JSON.stringify(singleData)}</span> : null}
      </form>
      <div className='flex flex-col gap-4'>
        {loading ? <span>Loading...</span> : null}
        {error ? <span className='mt-[-1rem] text-red-500'>{error}</span> : null}
      </div>
    </div>
  )
}
