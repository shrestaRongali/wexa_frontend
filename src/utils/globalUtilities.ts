export const setDataOnLocalStorage = (key: string, value: string) => {
    return localStorage.setItem(key, value);
}

export const getDataFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    if (value === null) {
        return "";
    }
    return value;
}

export const removeDataFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}

export const isMobile = (): boolean => {
    if (window.screen.width <= 992) {
        return true;
    }
    return false;
}

