import { ROUTES } from "./routes";

const { home, ping, coinList } = ROUTES;

export const MENU_ITEMS = [
  { id: "home", path: home, name: "Home" },
  { id: "ping", path: ping, name: "Ping" },
  { id: "coins", path: coinList, name: "Coins" },
];
