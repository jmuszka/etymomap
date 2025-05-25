/**
 * Class to store and retrieve information of a word in the dictionary
 */
export class Word {
   
    data;

    /**
     * Populate word data
     * @param {object} reqRes JSON object returned from Merriam-Webster API request
     */
    public constructor(reqRes: object) {
        this.data = reqRes;
    }

    /**
     * Return first recorded use
     * @returns {string}
     */
    public getFirstUse(): string {
        return this.data['date'];
    }

    /**
     * Return name of word as string
     * @returns {string}
     */
    public toString(): string {
        return this.data.meta.id.split(/:/)[0];
    }

    /**
     * Return part of speech
     * @returns {string}
     */
    public getPartOfSpeech() {
        return this.data.fl;
    }

    public getEtymology() {
        if (this.data.et) return this.data.et[0][1];
    }

    public getDefinitions() {
        return this.data.shortdef;
    }
}