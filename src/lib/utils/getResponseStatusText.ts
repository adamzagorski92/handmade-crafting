export const getResponseStatusText = (
  KVList: Record<number, string>,
  httpStatus: number,
): string => {
  return KVList[httpStatus] ?? String(httpStatus);
};
