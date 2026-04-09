import { createBrowserRouter } from "react-router";
import Root from "../../layout/Root";
import Home from "../../pages/Home";
import Ping from "../../pages/Ping";
import CoinListItem from "../../pages/CoinList";
import { ROUTES } from "../constans/routes";

const { home, ping, coinList } = ROUTES;

export const router = createBrowserRouter([
  {
    path: home,
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: ping,
        Component: Ping,
      },
      { path: coinList, Component: CoinListItem },
    ],
  },
]);
