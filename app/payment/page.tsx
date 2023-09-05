"use client";
import { HTTP_METHODS } from "next/dist/server/web/http";
import React from "react";

import ActionButton, { methods } from "@/components/ActionButton";
import JsonContainer from "@/components/JsonContainer";
import { generateDummyPayment } from "@/helpers/generateFakePayment";
import useFetchData from "@/hooks/useFetchData";

export default function Packages() {

  const dummyData2 = React.useMemo(() => generateDummyPayment(), []);
  const {
    data: getResponse,
    loading: getLoading,
    error: getError,
    trigger: triggerGet
  } = useFetchData();

  const {
    data: postResponse,
    loading: postLoading,
    error: postError,
    trigger: triggerPost
  } = useFetchData();

  const loading = getLoading || postLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerPost({
      url: "/api/payment",
      method: HTTP_METHODS[3]
    });
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-center text-bold text-violet-900 font-bold'>TEST PAYMENT ENDPOINTS</h1>
      <h2 className='text-center text-bold font-bold'>Request body</h2>
      <JsonContainer formattedJSON={JSON.stringify(dummyData2, null, 2)} />
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <ActionButton type="submit" method={methods.post} url={"/api/payment"} />
        {postResponse ? <JsonContainer formattedJSON={JSON.stringify(postResponse, null, 2)} /> : null}
      </form>
      <div className='flex flex-col gap-4'>
        <ActionButton method={methods.get} url={"/api/payment"} onClick={() => triggerGet({ url: "/api/payment", method: HTTP_METHODS[0] })} />
        {getResponse ? <JsonContainer formattedJSON={JSON.stringify(getResponse, null, 2)} /> : null}
      </div>
      {loading ? <span>Loading...</span> : null}
      {getError ? <JsonContainer formattedJSON={JSON.stringify(getError, null, 2)} /> : null}
      {postError ? <JsonContainer formattedJSON={JSON.stringify(postError, null, 2)} /> : null}
    </div>
  );
}
