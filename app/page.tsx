"use client";
import { HTTP_METHODS } from "next/dist/server/web/http";
import React from "react";

import ActionButton, { methods } from "@/components/ActionButton";
import JsonContainer from "@/components/JsonContainer";
import useFetchData from "@/hooks/useFetchData";

export default function Home() {
  const initialFormState = { fullName: "", email: "" };
  const [form, setForm] = React.useState(initialFormState);
  const { data, loading, error, trigger } = useFetchData();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trigger({ url: "/api/users", method: HTTP_METHODS[3], body: { ...form } });
    setForm(initialFormState);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h1 className='text-center text-bold text-violet-900 font-bold'>TEST SIGN UP ENDPOINTS</h1>
      <input value={form.fullName} className="border-2 border-gray-800 p-2" name="fullName" onChange={handleChange} type="text" placeholder='name' />
      <input value={form.email} className="border-2 border-gray-800 p-2" name="email" onChange={handleChange} type="text" placeholder='email' />
      <ActionButton type="submit" method={methods.post} url={"/api/users"} />
      {loading ? <span>Loading...</span> : null}
      {data ? <JsonContainer formattedJSON={JSON.stringify(data, null, 2)} /> : null}
      {error ? <JsonContainer formattedJSON={JSON.stringify(error, null, 2)} /> : null}
    </form>
  );
}
