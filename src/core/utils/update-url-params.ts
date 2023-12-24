export const updateUrlParams = (key: string, value: string) => {
  if (!key) {
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, '', newUrl);
};

export const deleteUrlParam = (key: string) => {
  if (!key) {
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(key);
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, '', newUrl);
};
