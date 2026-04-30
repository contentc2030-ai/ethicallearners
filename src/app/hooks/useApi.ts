import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

type HttpMethod = "get" | "post" | "put" | "delete";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  request: (body?: any, config?: AxiosRequestConfig) => Promise<void>;
}

export function useApi<T>(
  url: string,
  method: HttpMethod = "get",
  options: AxiosRequestConfig = {}
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const request = useCallback(
    async (body?: any, config?: AxiosRequestConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios({
          url,
          method,
          data: body,
          ...options,
          ...config,
        });
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [url, method, options]
  );

  return { data, error, isLoading, request };
}
