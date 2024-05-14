"use client";
import { HTTP_METHOD } from "next/dist/server/web/http";
import { useState } from "react";

import { useCookie } from "./useCookie";

type FetchDataResponse<T> = {
  data: T | undefined;
  loading: boolean;
  error: string | undefined;
  trigger: (options: {
    url: string;
    body?: any;
    method: HTTP_METHOD;
  }) => Promise<void>;
};

const useFetchData = function <T>() {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { getCookie } = useCookie("token");

  const trigger = async ({
    url,
    body,
    method,
  }: {
    url: string;
    body?: any;
    method: HTTP_METHOD;
  }) => {
    try {
      const token = getCookie();
      const headers = new Headers({
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : null),
      });
      setError("");
      setLoading(true);

      const options: RequestInit = {
        method,
        headers,
        ...(body ? { body: JSON.stringify(body) } : null),
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
    trigger,
  } as FetchDataResponse<T>;
};

export default useFetchData;
