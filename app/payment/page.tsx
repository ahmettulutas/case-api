"use client";
import React from "react";

import ActionButton, { methods } from "@/components/ActionButton";
import JsonContainer from "@/components/JsonContainer";
import { generateDummyPayment } from "@/helpers/generateFakePayment";
export default function Packages() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState("");
  const [error, setError] = React.useState("");
  const [postData, setPostData] = React.useState();
  const [dummyData, setDummyData] = React.useState<null | Record<string, any>>(null);

  React.useEffect(() => {
    const data = generateDummyPayment();
    setDummyData(data);
  }, []);


  const handleGetData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/payment");
      const responseData = await response.json();
      setData(responseData);
    } catch (err: any) {
      setError(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setData("");
      await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({ ...dummyData })
      }).then(res => res.json()).then(res => setPostData(res));
    } catch (err: any) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-4 m-10'>
      <h1 className='text-center text-bold text-violet-900 font-bold'>TEST PAYMENT ENDPOINTS</h1>
      <h2 className='text-center text-bold font-bold'>Request body</h2>
      <JsonContainer formattedJSON={JSON.stringify(dummyData, null, 2)} />
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <ActionButton type="submit" method={methods.post} url={"/api/payment"} />
        {postData ? <JsonContainer formattedJSON={JSON.stringify(postData, null, 2)} /> : null}
      </form>
      <div className='flex flex-col gap-4'>
        <ActionButton method={methods.get} url={"/api/payment"} onClick={handleGetData} />
        {data ? <JsonContainer formattedJSON={JSON.stringify(data, null, 2)} /> : null}
      </div>
      {loading ? <span>Loading...</span> : null}
      {error ? <JsonContainer formattedJSON={JSON.stringify(error, null, 2)} /> : null}
    </div>
  );
}
