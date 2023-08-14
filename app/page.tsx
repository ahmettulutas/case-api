"use client";
import React from "react";

import ActionButton, { methods } from "@/components/ActionButton";
import JsonContainer from "@/components/JsonContainer";

export default function Home() {
  const initialFormState = { fullName: "", email: "" };

  const [form, setForm] = React.useState(initialFormState);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const [error, setError] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ ...form }),
      }).then(res => res.json()).then(res => setData(res));

    } catch (err: any) {
      setError(JSON.stringify(err));
    }
    setLoading(false);
    setForm(initialFormState);
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
