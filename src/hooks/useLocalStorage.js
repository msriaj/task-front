export function useLocalStorage(key, initialValue) {
  const setItem = (key, value) =>
    key && value && localStorage.setItem(key, JSON.stringify(value));

  const getItem = (key) => {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
  };

  if (!key && initialValue) throw Error("key is required !");
  if (key && !initialValue) throw Error("value is required !");

  if (key && initialValue) {
    setItem(key, initialValue);
  }

  return [getItem, setItem];
}
