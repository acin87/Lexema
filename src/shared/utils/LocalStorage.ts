export const loadState = <T>(key: string): T | undefined => {
  try {
    const jsonState = localStorage.getItem(key);
    if (!jsonState) {
      return undefined;
    }
    return JSON.parse(jsonState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};


/**
 * Сохраняет состояние в localStorage
 * @param state - состояние
 * @param key - ключ для сохранения в localStorage
 */ 
export const saveState = <T extends object>(state: T, key: string) => {
  const stringState = JSON.stringify(state);
  localStorage.setItem(key, stringState);
};
