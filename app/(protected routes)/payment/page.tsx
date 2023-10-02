
import React from "react";

import GetPayment from "@/components/GetPayment";
import MakePayment from "@/components/MakePayment";
export default async function Packages() {
  return (
    <div className='flex flex-col gap-2'>
      <section className="p-4 bg-gray-200">
        <h1 className='text-center font-bold'>TEST PAYMENT POST</h1>
        <MakePayment />
      </section>
      <section className="p-4 bg-gray-200">
        <div className='flex flex-col gap-2'>
          <h1 className='text-center font-bold'>TEST PAYMENT GET</h1>
          <GetPayment />
        </div>
      </section>
    </div>
  );
}
