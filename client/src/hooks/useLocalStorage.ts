import { useCallback, useEffect, useRef, useState } from "react";

const IS_SERVER = typeof window === "undefined";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
    const initialValueRef = useRef(initialValue);

    const readValue = useCallback(() => {
        if (IS_SERVER) return initialValueRef.current;

        try {
            const item = window.localStorage.getItem(key);

            if (!item) {
                window.localStorage.setItem(key, JSON.stringify(initialValueRef.current));
                return initialValueRef.current;
            }

            return JSON.parse(item) as T;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValueRef.current;
        }
    }, [key]);

    const [storedValue, setStoredValue] = useState<T>(() => readValue())
    const storedValueRef = useRef(storedValue);
    storedValueRef.current = storedValue;

    useEffect(() => {
        const handleStorageChange = (event: Event) => {
            if (event instanceof StorageEvent && event.key !== key) return;
            setStoredValue(readValue());
        };

        window.addEventListener("storage", handleStorageChange)
        window.addEventListener(`local-storage:${key}`, handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener(`local-storage:${key}`, handleStorageChange);
        };
    }, [key, readValue]);

    const setValue = useCallback((value: T | ((prev: T) => T)) => {
        if (IS_SERVER) {
            console.warn(`Tried setting localStorage key "${key}" in a server environment.`);
            return;
        }

        try {
            const valueToStore = typeof value === "function"
                ? (value as (prev: T) => T)(storedValueRef.current)
                : value;

            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setStoredValue(valueToStore);

            window.dispatchEvent(new Event(`local-storage:${key}`));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key]);

    const removeValue = useCallback(() => {
        if (IS_SERVER) {
            console.warn(`Tried removing localStorage key "${key}" in a server environment.`);
            return;
        }

        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValueRef.current);

            window.dispatchEvent(new Event(`local-storage:${key}`));
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    }, [key]);

    return [storedValue, setValue, removeValue];
}
