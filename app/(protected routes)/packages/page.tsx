"use client";
import { HTTP_METHODS } from "next/dist/server/web/http";
import React from "react";

import ActionButton, { methods } from "@/components/ActionButton";
import JsonContainer from "@/components/JsonContainer";
import useFetchData from "@/hooks/useFetchData";


export default function Packages() {
  const [packageId, setPackageId] = React.useState("");
  const { data: bulkDataResponse, loading: bulkDataLoading, error: bulkDataError, trigger: triggerGetAllData } = useFetchData();
  const { data: singleDataResponse, loading: singleDataLoading, error: singleDataError, trigger: triggerGetSingleData } = useFetchData();

  return (
    <div className='flex flex-col gap-2'>
      <section className="p-4 bg-gray-200">
        <h1 className='text-center font-bold'>TEST GET ALL PACKAGES</h1>
        <div className='flex flex-col gap-2'>
          <ActionButton
            method={methods.get}
            url={"/api/packages"}
            onClick={() => triggerGetAllData({ url: "/api/packages", method: HTTP_METHODS[0] })} />
          {bulkDataLoading ? <span>Loading...</span> : null}
          {bulkDataError ? <JsonContainer formattedJSON={JSON.stringify(bulkDataError, null, 2)} /> : null}
          {bulkDataResponse ? 
            <div className="flex flex-col gap-1">
              <span className="font-bold">Response:</span>
              <JsonContainer formattedJSON={JSON.stringify(bulkDataResponse, null, 2)} />
            </div>
            : null}
        </div>
      </section>
      <section className="p-4 bg-gray-200">
        <h1 className='text-center font-bold'>TEST GET PACKAGE BY ID</h1>
        <form className='flex flex-col gap-2'
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            triggerGetSingleData({ url: `/api/packages/${packageId}`, method: HTTP_METHODS[0] });
          }}>
          <input
            value={packageId}
            name="packageId"
            type="text"
            className="border-2 border-gray-800 p-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPackageId(e.target.value)}
            placeholder='Enter Package Id'
          />
          <ActionButton
            method={methods.get}
            type="submit"
            url={"/api/packages/${packageId}"} />
          {singleDataResponse ? <JsonContainer formattedJSON={JSON.stringify(singleDataResponse, null, 2)} /> : null}
        </form>
        <div className='flex flex-col gap-2'>
          {singleDataLoading ? <span>Loading...</span> : null}
          {singleDataError ? <JsonContainer formattedJSON={JSON.stringify(singleDataError, null, 2)} /> : null}
          {singleDataResponse ? 
            <div className="flex flex-col gap-1">
              <span className="font-bold">Response:</span>
              <JsonContainer formattedJSON={JSON.stringify(singleDataResponse, null, 2)} />
            </div>
            : null}
        </div>
      </section>
    </div>
  );
}
