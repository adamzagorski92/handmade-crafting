import {
  CoinGeckoService,
  type PingResponse,
} from "../lib/api/coinGecko.service";
import { useFetch } from "../lib/hooks/useFetch";

const Ping = () => {
  const { data, error, isPending, retry, abort } = useFetch<PingResponse>(
    CoinGeckoService.ping,
  );
  return (
    <>
      <h1>Ping Page</h1>
      <div>
        {isPending && <p>Loading...</p>}
        {!isPending && data && (
          <p>
            <strong>Ping:</strong> {data.gecko_says}
          </p>
        )}
        {!isPending && !data && !error && <p>No data</p>}
      </div>
      <button onClick={abort}>Abort request</button>
      <button onClick={retry}>Refresh request</button>
      <div>{error && `Błąd: ${error}`}</div>
    </>
  );
};

export default Ping;
