import type { Dispatch, SetStateAction } from "react";
import { fetcher } from "../utils/fetcher";
import { ENDPOINTS } from "../constans/endpoints";
import { CREDENCIAL } from "../constans/credentials";

export type PingResponse = {
  gecko_says: string;
};

type Platforms = Record<string, string>;
export interface CoinListItemData {
  id: string;
  symbol: string;
  name: string;
  platforms: Platforms;
}

export interface ServiceOption {
  signal?: AbortSignal;
  errorSetter: Dispatch<SetStateAction<string>>;
  loadingSetter?: Dispatch<SetStateAction<boolean>>;
}

export const CoinGeckoService = {
  ping(
    dataSet: Dispatch<SetStateAction<PingResponse | null>>,
    options: ServiceOption,
  ) {
    fetcher<PingResponse>({
      url: ENDPOINTS.ping,
      dataSetter: dataSet,
      credentials: CREDENCIAL,
      ...options,
    });
  },

  getCoinList(
    dataSet: Dispatch<SetStateAction<CoinListItemData[] | null>>,
    options: ServiceOption,
  ) {
    fetcher<CoinListItemData[]>({
      url: ENDPOINTS.list,
      dataSetter: dataSet,
      credentials: CREDENCIAL,
      ...options,
    });
  },
};
