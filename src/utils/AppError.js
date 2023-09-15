export class GLobalError extends Error {
    constructor(message) {
        super(message);
        this.name = "GlobalError";
    }
}

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
    }
}
