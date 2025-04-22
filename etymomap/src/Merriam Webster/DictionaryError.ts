/**
 * Error for when something goes wrong with the dictionary API call
 */
export class DictionaryError extends Error {
    public constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, DictionaryError.prototype);
    }

    public toString(): string {
        return this.message;
    }

    public print(): void {
        console.log(this);
    }
}