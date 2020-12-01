class PersistData {
    constructor(name) {
        this.name = name;
        this.storage = window.localStorage;
    }
    get() {
        return this.storage.getItem(this.name);
    }
    getBoolean() {
        const value = this.get();
        if (value) {
            return value === 'true';
        }
        return value;
    }
    getNumber() {
        const value = this.get();
        if (value) {
            return Number(value);
        }
        return value;
    }
    set(value) {
        this.storage.removeItem(this.name);
        try {
            this.storage.setItem(this.name, value);
        } catch (ex) {
            console.warn(
                `Data for '${this.name}' couldn't be persisted to storage (it may be simply too large)`
            );
        }
    }
}

export default PersistData;
