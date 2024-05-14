import React from "react";

import { AddNewPackage } from "@/components/AddNewPackage";
import AddNewUser from "@/components/AddNewUser";
import UpdateUser from "@/components/UpdateNewUser";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <section className="p-4 bg-gray-200">
        <AddNewUser />
      </section>
      <section className="p-4 bg-gray-200">
        <UpdateUser />
      </section>
      <section className="p-4 bg-gray-200">
        <AddNewPackage />
      </section>
    </div>
  );
}
