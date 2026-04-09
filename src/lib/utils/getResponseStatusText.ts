import {
  HTTP_STATUS,
  type HttpStatusCode,
  type HttpStatusDescription,
} from "../constans/httpStatus";

export const getResponseStatusText = (
  KVList: typeof HTTP_STATUS,
  httpStatus: number,
): HttpStatusDescription | "Unknown error" =>
  KVList[httpStatus as HttpStatusCode] ?? "Unknown error";
