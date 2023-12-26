export const getSearchParamsFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);

  return {
    fromCurrency: searchParams.get('fromCurrency') || null,
    toCurrency: searchParams.get('toCurrency') || null,
    fromAmount: searchParams.get('fromAmount') || null
  };
};
