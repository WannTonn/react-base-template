import localForage from 'localforage';

export const setForageItem = (key: string, value) => {
  return localForage.setItem(key, value);
};

export const getForageItem = (key: string) => {
  return localForage.getItem(key);
};

export const removeForageItem = (key: string) => {
  return localForage.removeItem(key);
}