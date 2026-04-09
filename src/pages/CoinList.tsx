import { useEffect, useState } from "react";
import { ENDPOINTS } from "../lib/constans/endpoints";
import { fetcher } from "../lib/utils/fetcher";
import { CREDENCIAL } from "../lib/constans/credentials";

const coinList = ENDPOINTS.list;
const PAGE_SIZE = 10;

type Platforms = Record<string, string>;

interface CoinListItem {
  id: string;
  symbol: string;
  name: string;
  platforms: Platforms;
}

const CoinListItem = () => {
  const [coinListData, setCoinListData] = useState<CoinListItem[] | null>(null);
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPage = coinListData
    ? Math.ceil(coinListData.length / PAGE_SIZE)
    : 0;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentItems =
    coinListData?.slice(startIndex, startIndex + PAGE_SIZE) ?? [];

  useEffect(() => {
    const controller = new AbortController();
    fetcher<CoinListItem[]>({
      url: coinList,
      dataSetter: setCoinListData,
      errorSetter: setError,
      credentials: CREDENCIAL,
      signal: controller.signal,
      loadingSetter: setIsPending,
    });

    return () => controller.abort();
  }, []);

  return (
    <>
      <h1>Coin List</h1>

      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!isPending && coinListData && (
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
        </>
      )}
    </>
  );
};

export default CoinListItem;
