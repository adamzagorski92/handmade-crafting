# CoinGecko crypto handmade app

Hello!
This project is a fully hand-crafted project about myself. I decided to go this way
because AI was suppressing my deeper thinking about code and what is truly
shameful. AI killed my muscle memory for typing code without assistance.
Sometimes I genuinely forgot how to write something as simple as this:

```javascript
let isCodeOnlyWitthAI = true;

const braveButton = document.getElementById("braveButton");
const switchToBrave = () => {
  isCodeOnlyWitthAI = false;
  checkConfidence();
};

const checkConfidence = () => {
  if (isCodeOnlyWitthAI) {
    console.log("I'm very shameFull in Programming");
  } else {
    console.log("I'm very brave");
  }
};

braveButton.addEventListener("click", switchToBrave);
checkConfidence();
```

That is not the way to become a great software engineer.

## How to run project?

```bash
mkdir adamzagorski92_project
cd adamzagorski92_project
git clone https://github.com/adamzagorski92/handmade-crafting.git
cd handmade-crafting
pnpm install
pnpm run dev
```

## API ENGINE - how to develop?

1. Add a new endpoint to [endpoints.ts](./src/lib/constans/endpoints.ts) look at [Endpoint Showcase](https://docs.coingecko.com/docs/endpoint-showcase)
2. **(optional)** If you want to create a new page for a new endpoint, add the path to [routes.ts](./src/lib/constans/routes.ts) and export it to other files
3. Add a new type for the data structure in [CoinGeckoService.ts](./src/lib/api/coinGecko.service.ts)
4. Create a new object consisting of: name, parameters, and [fetcher.ts](./src/lib/utils/fetcher.ts) — (**IMPORTANT** Follow the same object structure as in [CoinGeckoService](./src/lib/api/coinGecko.service.ts))
5. Implement [useFetch.ts](./src/lib/hooks/useFetch.ts) following the same pattern as in [CoinList.tsx](./src/pages/CoinList.tsx) or [Ping.tsx](./src/pages/Ping.tsx)
6. If you need to use [useFetch.ts](./src/lib/hooks/useFetch.ts) multiple times in a single component, I prefer calling it 2 or 3 times with different alias names for the returned values before creating a new wrapper around useFetch
7. HTTP error codes can be found in [httpStatus.ts](./src/lib/constans/httpStatus.ts) — these are based on the [CoinGecko error documentation](https://docs.coingecko.com/docs/common-errors-rate-limit)
8. **(optional)** add cashing inside [fetcher.ts](./src/lib/utils/fetcher.ts) or switch you approuch to [Tanstack Query](https://tanstack.com/query/latest)
9. **(recommended)** Research potential security vulnerabilities and edge cases in the fetcher abstraction
