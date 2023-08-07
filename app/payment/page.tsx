"use client";
import React from "react";

import { generateDummyPayment } from "@/helpers/generateFakePayment";

export default function Packages() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const [postData, setPostData] = React.useState();
  const fakeData = generateDummyPayment();
  const handleGetData = () => {
    setLoading(true);
    fetch("/api/payment").then((res) => res.json()).then(data => {
      setData(data);
      setLoading(false);
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({ ...fakeData })
      }).then(res => res.json()).then(res => setPostData(res));
    } catch (err: any) {
      throw new Error(err);
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col gap-4 m-10'>
      <h1 className='text-center text-bold text-violet-900'>TEST PAYMENT ENDPOINTS</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" type="submit">POST PAYMENT WITH RANDOM DATA</button>
        {postData ? <span>{JSON.stringify(postData)}</span> : null}
      </form>
      <div className='flex flex-col gap-4'>
        <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" onClick={handleGetData}>TEST GET PAYMENT ENDPOINT</button>
        {data ? <span>{JSON.stringify(data)}</span> : null}
      </div>
      {loading ? <span>Loading...</span> : null}
    </div>
  );
}
