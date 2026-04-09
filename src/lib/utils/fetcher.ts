import type { Dispatch, SetStateAction } from "react";
import { HTTP_STATUS } from "../constans/httpStatus";
import { getResponseStatusText } from "./getResponseStatusText";

interface FetcherOptions<T> {
  url: string;
  dataSetter: Dispatch<SetStateAction<T | null>>;
  errorSetter: Dispatch<SetStateAction<string>>;
  credentials: RequestInit;
  signal?: AbortSignal;
  loadingSetter?: Dispatch<SetStateAction<boolean>>;
}

export const fetcher = async <T>({
  url,
  dataSetter,
  errorSetter,
  credentials,
  signal,
  loadingSetter,
}: FetcherOptions<T>): Promise<void> => {
  loadingSetter?.(true);
  let aborted = false;

  const combinedSignal = signal
    ? AbortSignal.any([signal, AbortSignal.timeout(10_000)])
    : AbortSignal.timeout(10_000);

  try {
    const response = await fetch(url, {
      ...credentials,
      signal: combinedSignal,
    });

    // I used HTTP_STATUS[response.status] in develop enviroment, because in production(with HTTPS) response.text() is empty
    if (!response.ok) {
      const responseStatusText = getResponseStatusText(
        HTTP_STATUS,
        response.status,
      );
      throw new Error(`HTTP ${response.status}: ${responseStatusText}`);
    }

    let data: T;
    try {
      data = await response.json();
    } catch {
      const responseStatusText = getResponseStatusText(
        HTTP_STATUS,
        response.status,
      );
      throw new Error(
        `Invalid JSON [${response.status}]: ${responseStatusText}`,
      );
    }

    dataSetter(data);
  } catch (err) {
    if (err instanceof DOMException) {
      if (err.name === "AbortError") {
        aborted = true;
        return;
      }
      if (err.name === "TimeoutError") {
        errorSetter("Server timeout");
        return;
      }
    }

    if (err instanceof TypeError) {
      errorSetter("Network connection failure");
      return;
    }
    errorSetter(err instanceof Error ? err.message : "Unknown error");
  } finally {
    if (!aborted) loadingSetter?.(false);
  }
};
