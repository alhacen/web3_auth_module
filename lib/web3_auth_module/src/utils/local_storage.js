export class LocalStorage {
    static get(key) {
        return localStorage.getItem(key);
    }

    static set(key, value) {
        return localStorage.setItem(key, value);
    }

    static remove(key) {
        return localStorage.removeItem(key);
    }
}
