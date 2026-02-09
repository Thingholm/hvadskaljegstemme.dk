import { useState } from "react";

const IS_SERVER = typeof window === "undefined";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (IS_SERVER) {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);

            if (!item) {
                console.log(initialValue)

                window.localStorage.setItem(key, JSON.stringify(initialValue));
                return initialValue;
            }

            return JSON.parse(item);
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        if (IS_SERVER) {
            console.warn(`Tried setting localStorage key "${key}" in a server environment.`);
            return;
        }

        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setStoredValue(valueToStore);
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    const removeValue = () => {
        if (IS_SERVER) {
            console.warn(`Tried removing localStorage key "${key}" in a server environment.`);
            return;
        }

        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue, removeValue];
}