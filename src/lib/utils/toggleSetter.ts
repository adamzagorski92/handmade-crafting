import type { Dispatch, SetStateAction } from "react";

export const toggleSetter = <T>(
  setter: Dispatch<SetStateAction<T>>,
  truthyValue: T,
  falsyValue: T,
): void => {
  setter((prev) => (prev === truthyValue ? falsyValue : truthyValue));
};
