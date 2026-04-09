import { useState } from "react";

import {
  CoinGeckoService,
  type CoinListItemData,
} from "../lib/api/coinGecko.service";
import { useFetch } from "../lib/hooks/useFetch";
const PAGE_SIZE = 10;

const CoinListItem = () => {
  const { data, error, isPending, retry, abort } = useFetch<CoinListItemData[]>(
    CoinGeckoService.getCoinList,
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = data ? Math.ceil(data.length / PAGE_SIZE) : 0;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentItems = data?.slice(startIndex, startIndex + PAGE_SIZE) ?? [];

  return (
    <>
      <h1>Coin List</h1>

      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!isPending && data && (
        <>
          <ul>
            {currentItems.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>

          <div>
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>
              {currentPage} / {totalPage}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPage}
            >
              Next
            </button>
          </div>
          <button onClick={abort}>Abort request</button>
          <button onClick={retry}>Refresh request</button>
        </>
      )}
    </>
  );
};

export default CoinListItem;
