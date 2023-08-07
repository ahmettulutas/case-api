import Image from "next/image";
import Link from "next/link";

export type Package = {
  _id: string;
  imagePath: string;
  name: string;
  details: string[];
  tags: string[];
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AllPackages = {
  allPackages: Package[];
}

async function getData(): Promise<AllPackages> {
  const res = await fetch("https://paramfe-case-backend.vercel.app/api/packages");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="m-10 grid grid-cols-3 gap-4">
      {data.allPackages?.map(item => (
        <div key={item._id} className="border-gray-800 border-2 col-span-3 md:col-span-1 flex gap-4 items-center">
          <Link className="flex items-center w-full gap-4" href={`/ssr-packages/${item._id}`}>
            <div className="relative h-40 w-full">
              <Image src={item.imagePath} fill alt="image" />
            </div>
            <span>{item.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

