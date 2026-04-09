import type { Dispatch, SetStateAction } from "react";

export const fetcher = async <T>(
  url: string,
  dataSetter: Dispatch<SetStateAction<T | null>>,
  errorSetter: Dispatch<SetStateAction<string>>,
  credentials: RequestInit,
  signal?: AbortSignal,
  loadingSetter?: Dispatch<SetStateAction<boolean>>,
) => {
  loadingSetter?.(true);
  const combinedSignal = signal
    ? AbortSignal.any([signal, AbortSignal.timeout(10_000)])
    : AbortSignal.timeout(10_000);
  try {
    const response = await fetch(url, {
      ...credentials,
      signal: combinedSignal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    let data: T;
    try {
      data = await response.json();
    } catch {
      throw new Error(
        `Not correct JSON type server response: [${response.status}]`,
      );
    }

    dataSetter(data);
  } catch (err) {
    if (err instanceof DOMException) {
      if (err.name === "TimeoutError") {
        errorSetter("Server timeout");
        return;
      }
      if (err.name === "AbortError") {
        return;
      }
    }

    if (err instanceof TypeError) {
      errorSetter("Failure network conection");
      return;
    }
    errorSetter(err instanceof Error ? err.message : "Unknown error");
  } finally {
    loadingSetter?.(false);
  }
};
