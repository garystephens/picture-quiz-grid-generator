class PersistData {
    constructor(name) {
        this.name = name;
    }
    get() {
        return localStorage.getItem(this.name);
    }
    set(value) {
        localStorage.setItem(this.name, value);
    }
}

export { PersistData };
