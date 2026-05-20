/*
=========================
Storage Utilities
=========================
*/

export function loadFromStorage(key, fallbackValue) {
    const savedData = localStorage.getItem(key);

    if (!savedData) {
        return fallbackValue;
    }

    try {
        return JSON.parse(savedData);
    } catch (error) {
        console.error("Failed to load storage data:", error);
        return fallbackValue;
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}