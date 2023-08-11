import React, { useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const trigger = async ({
    url,
    body,
    event
  }: {
    url: string;
    body?: any;
    event: React.FormEvent | React.MouseEvent;
  }) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      const options: RequestInit = {
        method: body ? "POST" : "GET",
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
