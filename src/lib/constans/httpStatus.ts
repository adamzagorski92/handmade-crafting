export const HTTP_STATUS = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  408: "Request Timeout",
  429: "Too Many Requests",
  500: "Internal Server Error",
  503: "Service Unavailable",
  1020: "This is due to violation of CDN firewall rule",
  10005: "This request is limited to Pro API subscribers",
  10002:
    "API Key Missing. Please make sure you’re using the right authentication method. For Pro API, ensure you pass in x_cg_pro_api_key parameter with a Pro Key.For Demo API, ensure you pass in x_cg_demo_api_key parameter with a Demo Key.",
  10010:
    "You have provided incorrect API key credentials. If you are using Pro API key, please change your root URL from api.coingecko.com to pro-api.coingecko.com",
  10011:
    "You have provided incorrect API key credentials. If you are using Demo API key, please change your root URL from pro-api.coingecko.com to api.coingecko.com",
} as const;

export type HttpStatusCode = keyof typeof HTTP_STATUS;
export type HttpStatusDescription = (typeof HTTP_STATUS)[HttpStatusCode];
