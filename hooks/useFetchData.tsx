import { HTTP_METHOD } from "next/dist/server/web/http";
import { useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const trigger = async ({
    url,
    body,
    method
  }: {
    url: string;
    body?: any;
    method: HTTP_METHOD;
  }) => {

    try {
      setError("");
      setLoading(true);

      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : undefined
      };

      const response = await fetch(url, options);
      const responseData = await response.json();

      setData(responseData);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    trigger
  };
};

export default useFetchData;
