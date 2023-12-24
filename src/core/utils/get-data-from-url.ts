export const getDataFromUrl = () => {
  const search = new URLSearchParams(window.location.search);

  return {
    fromCurrency: search.get('fromCurrency'),
    toCurrency: search.get('toCurrency'),
    amount: search.get('amount'),
    toAmount: search.get('toAmount')
  };
};
