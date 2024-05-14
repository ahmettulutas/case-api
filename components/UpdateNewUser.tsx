"use client";
import React from "react";

import useFetchData from "@/hooks/useFetchData";
import { UserType } from "@/models/User";

import ActionButton, { methods } from "./ActionButton";
import JsonContainer from "./JsonContainer";

const today = new Date();
const threeDaysLater = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];
const initialFormState: Pick<
  UserType,
  "role" | "email" | "code" | "expireDate"
> = { email: "", code: "", expireDate: threeDaysLater, role: "user" };

const UpdateUser = () => {
  const [form, setForm] = React.useState(initialFormState);
  const {
    data: newUserData,
    loading: newUserLoading,
    error: newUserError,
    trigger: triggerAddNewUser,
  } = useFetchData();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked ? "admin" : "user" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleAddNewUser = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    triggerAddNewUser({ url: "/api/users", method: methods.put, body: form });
    setForm(initialFormState);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleAddNewUser}>
      <h1 className="text-center font-bold">UPDATE EXISTING USER</h1>
      <div>
        <label className="block" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          value={form.email}
          className="border-2 border-gray-800 p-2"
          name="email"
          onChange={handleChange}
          type="text"
          placeholder="email"
        />
      </div>
      <div>
        <label htmlFor="code">Random user code</label>
        <div className="flex gap-2">
          <input
            id="code"
            value={form.code}
            className="border-2 border-gray-800 p-1"
            name="code"
            onChange={handleChange}
            type="text"
            placeholder="code"
          />
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <label htmlFor="role-checkbox">isAdmin?</label>
        <input
          id="role-checkbox"
          type="checkbox"
          name="role"
          checked={form.role === "admin"}
          onChange={handleChange}
          className="h-4 w-4 bg-gray-100 border-gray-500 rounded focus:ring-2 cursor-pointer"
        />
      </div>
      <div>
        <label className="block" htmlFor="expireDate">
          Expire Date
        </label>
        <input
          id="expireDate"
          value={form.expireDate}
          className="border-2 border-gray-800 p-2"
          name="expireDate"
          onChange={handleChange}
          type="date"
          placeholder="expireDate"
        />
      </div>
      <ActionButton
        type="submit"
        method={methods.put}
        url={"/api/users"}
        disabled={!form.email}
      />
      {newUserLoading ? <span>Loading...</span> : null}
      {newUserData ? (
        <JsonContainer formattedJSON={JSON.stringify(newUserData, null, 2)} />
      ) : null}
      {newUserError ? (
        <JsonContainer formattedJSON={JSON.stringify(newUserError, null, 2)} />
      ) : null}
    </form>
  );
};

export default UpdateUser;
