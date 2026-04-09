import { ROUTES } from "./routes";

export const BASE_URL: string = "https://api.coingecko.com/api/v3";

const { ping, coinList } = ROUTES;

export const ENDPOINTS = {
  ping: `${BASE_URL}/${ping}`,
  list: `${BASE_URL}/${coinList}`,
};
