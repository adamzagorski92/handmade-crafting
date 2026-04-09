import { useCallback, useEffect, useRef, useState } from "react";
import { ENDPOINTS } from "../lib/constans/endpoints";
import { fetcher } from "../lib/utils/fetcher";
import { CREDENCIAL } from "../lib/constans/credentials";

type PingResponse = {
  gecko_says: string;
};

const Ping = () => {
  const { ping } = ENDPOINTS;
  const [data, setData] = useState<PingResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const controllerRef = useRef<AbortController | null>(null);
  const stateReset = () => {
    setData(null);
    setError("");
    setIsLoading(true);
  };

  const fetchData = useCallback(() => {
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    stateReset();

    fetcher<PingResponse>({
      url: ping,
      dataSetter: setData,
      errorSetter: setError,
      credentials: CREDENCIAL,
      signal: controller.signal,
      loadingSetter: setIsLoading,
    });
  }, []);

  useEffect(() => {
    fetchData();
    return () => controllerRef.current?.abort();
  }, []);

  const handleCancel = () => controllerRef.current?.abort();
  const handleRetry = () => fetchData();
  return (
    <>
      <h1>Ping Page</h1>
      <div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && data && (
          <p>
            <strong>Ping:</strong> {data.gecko_says}
          </p>
        )}
        {!isLoading && !data && !error && <p>No data</p>}
      </div>
      <button onClick={handleCancel}>Abort request</button>
      <button onClick={handleRetry}>Refresh request</button>
      <div>{error && `Błąd: ${error}`}</div>
    </>
  );
};

export default Ping;
