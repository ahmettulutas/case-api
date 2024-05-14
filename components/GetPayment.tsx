"use client";
import React from "react";

import ActionButton, { methods } from "@/components/ActionButton";
import JsonContainer from "@/components/JsonContainer";
import useFetchData from "@/hooks/useFetchData";

const GetPayment = () => {
  const {
    data: getResponse,
    loading: getLoading,
    error: getError,
    trigger: triggerGet,
  } = useFetchData();

  return (
    <>
      <ActionButton
        method={methods.get}
        url={"/api/payment"}
        onClick={() => triggerGet({ url: "/api/payment", method: methods.get })}
      />
      {getResponse ? (
        <div className="flex flex-col gap-1">
          <span className="font-bold">Response:</span>
          <JsonContainer formattedJSON={JSON.stringify(getResponse, null, 2)} />
        </div>
      ) : null}
      {getLoading ? <span>Loading...</span> : null}
      {getError ? (
        <JsonContainer formattedJSON={JSON.stringify(getError, null, 2)} />
      ) : null}
    </>
  );
};

export default GetPayment;
