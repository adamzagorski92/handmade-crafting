import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    fetcher<PingResponse>(
      ping,
      setData,
      setError,
      CREDENCIAL,
      controller.signal,
      setIsLoading,
    );

    return () => controller.abort();
  }, []);
  return (
    <>
      <h1>Ping Page</h1>
      <div>
        {data && !isLoading ? (
          <p>
            <strong>This ping come from backend:</strong> {data.gecko_says}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>{error && `Błąd: ${error}`}</div>
    </>
  );
};

export default Ping;
