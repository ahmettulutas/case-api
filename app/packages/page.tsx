"use client";
import { generateDummyPackageItem } from '@/helpers/generateFakePackage';
import React from 'react';

export default function Packages() {

  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();

  const handleGetData = () => {
    setLoading(true);
    fetch("/api/packages").then((res) => res.json()).then(data => {
      setData(data)
      setLoading(false);
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCode(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fakeData = generateDummyPackageItem();
    if (!code) {
      setError("Please provide the code");
    }
    else {

      try {
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

  return (
    <form className='flex flex-col gap-4 m-10' onSubmit={handleSubmit}>
      <h1 className='text-center text-bold text-violet-900'>TEST PACKAGES</h1>
      <input type="password" className="border-2 border-gray-800 p-2" onChange={handleChange} placeholder='password' />
      {error ? <span className='mt-[-1rem] text-red-500'>{error}</span> : null}
      <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" type="submit">POST PACKAGE WITH RANDOM DATA</button>
      <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" onClick={handleGetData}>TEST PAYMENT GET</button>
      {loading ? <span>Loading...</span> : null}
      {data ? <span>{JSON.stringify(data)}</span> : null}
    </form>
  )
}
