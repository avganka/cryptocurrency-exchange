export const serializeParams = (paramsObject: Record<string, unknown>) => {
  const searchParams = new URLSearchParams();

  Object.keys(paramsObject).forEach((key) => {
    if (paramsObject[key]) {
      searchParams.set(key, paramsObject[key] as string);
    }
  });

  return searchParams.toString();
};
