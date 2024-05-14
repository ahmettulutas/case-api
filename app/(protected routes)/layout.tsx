import { cookies } from "next/headers";

import JsonContainer from "@/components/JsonContainer";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) return <h1>You are unauthorized.</h1>;
  return (
    <main>
      <section className="p-4 bg-gray-200 my-2">
        <span className="font-bold">Bearer Token:</span>
        {token?.value ? <JsonContainer formattedJSON={token.value} /> : null}
        <span className="underline">
          Note: Bearer token automatically added to the requests`s headers as
          authorization. Add it to authorization headers if you want to try api
          via postman or from other sources.
        </span>
        <br />
      </section>

      {children}
    </main>
  );
}
