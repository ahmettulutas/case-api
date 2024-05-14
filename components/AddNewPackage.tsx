"use client";
import React from "react";

import ActionButton, { methods } from "@/components/ActionButton";
import JsonContainer from "@/components/JsonContainer";
import { generateDummyPackageItem } from "@/helpers/generateDummyDatas";
import useFetchData from "@/hooks/useFetchData";

import HydrateWrapper from "./HydrateWrapper";

export const AddNewPackage = () => {
  const {
    data: newPackageResponse,
    loading: newPackageLoading,
    error: newPackageError,
    trigger: triggerAddNew,
  } = useFetchData();
  const dummyData = generateDummyPackageItem();
  const handleAddNewPackage = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    triggerAddNew({
      url: "/api/packages",
      method: methods.post,
      body: { ...dummyData },
    });
  };

  return (
    <form onSubmit={handleAddNewPackage} className="flex flex-col gap-2">
      <h1 className="text-center font-bold">ADD NEW PACKAGE</h1>
      <h2 className="font-bold">Sample Request body:</h2>
      <HydrateWrapper>
        <JsonContainer formattedJSON={JSON.stringify(dummyData, null, 2)} />
      </HydrateWrapper>
      <ActionButton type="submit" method={methods.post} url={"/api/packages"} />
      {newPackageLoading ? <span>Loading...</span> : null}
      {newPackageResponse ? (
        <JsonContainer
          formattedJSON={JSON.stringify(newPackageResponse, null, 2)}
        />
      ) : null}
      {newPackageError ? (
        <JsonContainer
          formattedJSON={JSON.stringify(newPackageError, null, 2)}
        />
      ) : null}
    </form>
  );
};
