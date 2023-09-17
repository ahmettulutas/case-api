"use client";
import { HTTP_METHODS } from "next/dist/server/web/http";
import React from "react";

import ActionButton, { methods } from "@/components/ActionButton";
import JsonContainer from "@/components/JsonContainer";
import { generateDummyPackageItem } from "@/helpers/generateFakePackage";
import useFetchData from "@/hooks/useFetchData";
import { UserType } from "@/models/User";

const today = new Date().toISOString().split("T")[0];
const initialFormState: Pick<UserType, "role" | "email" | "code" | "expireDate"> = { email: "", code: "", expireDate: today, role: "user" };

export default function Home() {
  const [form, setForm] = React.useState(initialFormState);
  const { data: newUserData, loading: newUserLoading, error: newUserError, trigger: triggerAddNewUser } = useFetchData();
  const { data: newPackageResponse, loading: newPackageLoading, error: newPackageError, trigger: triggerAddNew } = useFetchData();
  const [code, setCode] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm(prev => ({ ...prev, [name]: checked ? "admin" : "user" }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerAddNewUser({ url: "/api/users", method: HTTP_METHODS[3], body: form });
    setForm(initialFormState);
  };

  const handleAddNewPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    const dummyData = generateDummyPackageItem();
    triggerAddNew({ url: "/api/packages", method: HTTP_METHODS[3], body: { ...dummyData, code } });
  };

  return (
    <div className="flex flex-col gap-2">
      <section className="p-4 bg-gray-200">
        <form className='flex flex-col gap-4' onSubmit={handleAddNewUser}>
          <h1 className='text-center font-bold'>ADD NEW USER</h1>
          <div className="flex gap-1 flex-col">
            <label htmlFor="email">Email</label>
            <input id="email" value={form.email} className="border-2 border-gray-800 p-2" name="email" onChange={handleChange} type="text" placeholder='email' />
          </div>
          <div className="flex gap-1 flex-col">
            <label htmlFor="code">Code</label>
          </div>
          <input id="code" value={form.code} className="border-2 border-gray-800 p-2" name="code" onChange={handleChange} type="text" placeholder='code' />
          <div className="flex gap-1 items-center">
            <label htmlFor="role-checkbox">isAdmin</label>
            <input id="role-checkbox" type="checkbox" name="role" checked={form.role === "admin"} onChange={handleChange} className="h-4 w-4 bg-gray-100 border-gray-500 rounded focus:ring-2 cursor-pointer" />
          </div>
          <div className="flex gap-1 flex-col">
            <label htmlFor="expireDate">Expire Date</label>
            <input id="expireDate" value={form.expireDate} className="border-2 border-gray-800 p-2" name="expireDate" onChange={handleChange} type="date" placeholder='expireDate' />
          </div>
          <ActionButton type="submit" method={methods.post} url={"/api/users"} />
          {newUserLoading ? <span>Loading...</span> : null}
          {newUserData ? <JsonContainer formattedJSON={JSON.stringify(newUserData, null, 2)} /> : null}
          {newUserError ? <JsonContainer formattedJSON={JSON.stringify(newUserError, null, 2)} /> : null}
        </form>
      </section>
      <section className="p-4 bg-gray-200">
        <form onSubmit={handleAddNewPackage} className='flex flex-col gap-4'>
          <h1 className='text-center font-bold'>ADD NEW PACKAGE</h1>
          <input name="password" type="password" className="border-2 border-gray-800 p-2" onChange={(e) => setCode(e.target.value)} placeholder='password' />
          <ActionButton type="submit" method={methods.post} url={"/api/packages"} />
        </form>
        {newPackageLoading ? <span>Loading...</span> : null}
        {newPackageResponse ? <JsonContainer formattedJSON={JSON.stringify(newPackageResponse, null, 2)} /> : null} 
        {newPackageError ? <JsonContainer formattedJSON={JSON.stringify(newPackageError, null, 2)} /> : null}
      </section>
    </div>
  );
}
