"use client"
import { generateDummyPayment } from '@/helpers/generateFakePayment';
import React from 'react';

export default function Packages() {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();

  const handleGetData = () => {
    setLoading(true);
    fetch("/api/payment").then((res) => res.json()).then(data => {
      setData(data)
      setLoading(false);
    })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fakeData = generateDummyPayment();
    try {
      setLoading(true);
      await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({ ...fakeData })
      })
    } catch (err: any) {
      throw new Error(err);
    }
    setLoading(false)
  }

  return (
    <div>

      <form className='flex flex-col gap-4 m-10' onSubmit={handleSubmit}>
        <h1 className='text-center text-bold text-violet-900'>TEST PAYMENT</h1>
        <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" type="submit">POST PAYMENT WITH RANDOM DATA</button>
      </form>
      <div className='flex flex-col gap-4 m-10'>
        <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" onClick={handleGetData}>TEST GET PAYMENT ENDPOINT</button>
        {data ? <span>{JSON.stringify(data)}</span> : null}
      </div>
      <div className='flex flex-col gap-4 m-10'>
        {loading ? <span>Loading...</span> : null}
        {error ? <span className='mt-[-1rem] text-red-500'>{error}</span> : null}
      </div>
    </div>
  )
}
