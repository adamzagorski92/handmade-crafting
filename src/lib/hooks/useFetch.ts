import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { type ServiceOption } from "../api/coinGecko.service";

type CoinGeckoAPIServiceFn<T> = (
  dataSetter: Dispatch<SetStateAction<T | null>>,
  options: ServiceOption,
) => void;

export const useFetch = <T>(
  coinGeckoAPIServiceFn: CoinGeckoAPIServiceFn<T>,
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(true);

  const controllerRef = useRef<AbortController | null>(null);

  const stateReset = () => {
    setData(null);
    setError("");
    setIsPending(true);
  };

  const fetchData = useCallback(() => {
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    stateReset();
    coinGeckoAPIServiceFn(setData, {
      signal: controller.signal,
      errorSetter: setError,
      loadingSetter: setIsPending,
    });
  }, [coinGeckoAPIServiceFn]);

  useEffect(() => {
    fetchData();
    return () => controllerRef.current?.abort();
  }, [fetchData]);

  return {
    data,
    error,
    isPending,
    retry: fetchData,
    abort: () => controllerRef.current?.abort(),
  };
};
