"use client";
import React from "react";

import { generateDummyPayment } from "@/helpers/generateDummyDatas";
import useFetchData from "@/hooks/useFetchData";

import ActionButton, { methods } from "./ActionButton";
import HydrateWrapper from "./HydrateWrapper";
import JsonContainer from "./JsonContainer";

const MakePayment = () => {
  const { data: postResponse, loading: postLoading, error: postError, trigger: triggerPost } = useFetchData();
  const dummyData = generateDummyPayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerPost({
      url: "/api/payment",
      method: methods.post,
      body: dummyData
    });
  };

  return (
    <div>
      <h2 className='font-bold'>Sample Request body:</h2>
      <HydrateWrapper>
        <JsonContainer formattedJSON={JSON.stringify(dummyData, null, 2)} />
      </HydrateWrapper>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <ActionButton type="submit" method={methods.post} url={"/api/payment"} />
        {postLoading ? <span>Loading...</span> : null}
        {postResponse ? 
          <div className="flex flex-col gap-1">
            <span className="font-bold">Response:</span>
            <JsonContainer formattedJSON={JSON.stringify(postResponse, null, 2)} /> 
          </div>
          : null}
        {postError ? <JsonContainer formattedJSON={JSON.stringify(postError, null, 2)} /> : null}
      </form>
    </div>
  );
};

export default MakePayment;