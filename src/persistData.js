class PersistData {
    constructor(name) {
        this.name = name;
    }
    get() {
        return localStorage.getItem(this.name);
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
        try {
            localStorage.removeItem(this.name); // in case setItem fails
            localStorage.setItem(this.name, value);
        } catch (ex) {
            console.warn(
                `Data for '${this.name}' couldn't be persisted to localStorage (it may be simply too large)`
            );
        }
    }
}

export default PersistData;
