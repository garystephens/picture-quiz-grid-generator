class PersistData {
    constructor(name) {
        this.name = name;
    }
    get() {
        return localStorage.getItem(this.name);
    }
    set(gridSize) {
        localStorage.setItem(this.name, gridSize);
    }
}

export { PersistData };
