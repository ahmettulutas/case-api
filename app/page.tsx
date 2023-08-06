"use client";
import React from 'react';

export default function Home() {
  const [form, setForm] = React.useState({ fullName: "", email: "" });
  const [data, setData] = React.useState([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }))
  }
  const handleGetData = () => {
    fetch("/api/users").then((res) => res.json()).then(data => setData(data))
  }
  React.useEffect(() => {
    handleGetData();
  }, [])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          ...form
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className='flex flex-col gap-4 m-10' onSubmit={handleSubmit}>
      <input className="border-2 border-gray-800 p-2" name="fullName" onChange={handleChange} type="text" placeholder='name' />
      <input className="border-2 border-gray-800 p-2" name="email" onChange={handleChange} type="text" placeholder='email' />
      <button className="border-2 border-gray-800 p-2" type="submit">SEND</button>
      <span>{JSON.stringify(data)}</span>
    </form>)
}
