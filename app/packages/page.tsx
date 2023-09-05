"use client";
import { HTTP_METHODS } from "next/dist/server/web/http";
import React from "react";

import ActionButton, { methods } from "@/components/ActionButton";
import JsonContainer from "@/components/JsonContainer";
// import { generateDummyPackageItem } from "@/helpers/generateFakePackage";
import useFetchData from "@/hooks/useFetchData";


export default function Packages() {
  const [packageId, setPackageId] = React.useState("");

  // UNCOMMENT THE LINES BELOW TO ADD MORE PACKAGES
  // const [code, setCode] = React.useState("");
  // const {
  //   data: addNewData,
  //   loading: addNewLoading,
  //   error: addNewError,
  //   trigger: triggerAddNew
  // } = useFetchData();
  // const handlePost = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!code) {
  //     window.alert("Please fill in the token field");
  //   }
  //   else {
  //     const dummyData = generateDummyPackageItem();
  //     triggerAddNew({ url: "/api/packages", method: HTTP_METHODS[3], body: { ...dummyData, code } });
  //   };
  // };

  const {
    data: bulkDataResponse,
    loading: bulkDataLoading,
    error: bulkDataError,
    trigger: triggerGetAllData
  } = useFetchData();

  const {
    data: singleDataResponse,
    loading: singleDataLoading,
    error: singleDataError,
    trigger: triggerGetSingleData
  } = useFetchData();
  const loading = bulkDataLoading || singleDataLoading /* || addNewLoading; */;  // UNCOMMENT THE LINE ON THE LEFT TO ADD MORE PACKAGES

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-center text-bold text-violet-900'>TEST PACKAGES ENDPOINTS</h1>

      {/* UNCOMMENT THE FORM BELOW TO ADD MORE PACKAGES  */}
      {/* <form onSubmit={handlePost} className='flex flex-col gap-4'>
        <input name="password" type="password" className="border-2 border-gray-800 p-2" onChange={(e) => setCode(e.target.value)} placeholder='password' />
        <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" type="submit">POST PACKAGE WITH RANDOM DATA</button>
      </form>
      {addNewData ? <JsonContainer formattedJSON={JSON.stringify(addNewData, null, 2)} /> : null} 
      */}
      <div className='flex flex-col gap-4'>
        <ActionButton
          method={methods.get}
          url={"/api/packages"}
          onClick={() => triggerGetAllData({ url: "/api/packages", method: HTTP_METHODS[0] })} />
        {bulkDataResponse ? <JsonContainer formattedJSON={JSON.stringify(bulkDataResponse, null, 2)} /> : null}
      </div>
      <form className='flex flex-col gap-4'
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
        {loading ? <span>Loading...</span> : null}
        {bulkDataError ? <JsonContainer formattedJSON={JSON.stringify(bulkDataError, null, 2)} /> : null}
        {singleDataError ? <JsonContainer formattedJSON={JSON.stringify(singleDataError, null, 2)} /> : null}
        {bulkDataError ? <JsonContainer formattedJSON={JSON.stringify(bulkDataError, null, 2)} /> : null}
        {/* UNCOMMENT THE LINE BELOW TO ADD MORE PACKAGES */}
        {/* {addNewError ? <JsonContainer formattedJSON={JSON.stringify(addNewError, null, 2)} /> : null} */}
      </div>
    </div>
  );
}
