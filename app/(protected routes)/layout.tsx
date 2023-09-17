import { cookies } from "next/headers";

import JsonContainer from "@/components/JsonContainer";

type Props = {
  children: React.ReactNode
}

export default async function RootLayout ({ children }: Props ) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <main>
      <section className="p-4 bg-gray-200 my-1">
        <span className="font-bold">Note: Bearer token automatically added to the requests`s headers as authorization. Add it to authorization headers if you want to try api via postman or from other sources.</span>
        <br />
        <span className="font-bold">Token:</span>
        {token?.value ? <JsonContainer formattedJSON={token.value} /> : null}
      </section>
      {children}
    </main>
  );
}
