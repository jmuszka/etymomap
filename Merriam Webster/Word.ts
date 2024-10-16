/**
 * Class to store and retrieve information of a word in the dictionary
 */
export class Word {
    /**
     * @property string storing the word itself
     */
    private name: String;

    /**
     * @property part of speech of word (ie. noun, verb, adjective, etc.)
     */
    private partOfSpeech: String;

    /**
     * @property languages the word derives from
     */
    private etymology: String[];

    /**
     * @property when the word first came into use
     */
    private firstUse: String;

    /**
     * @property definitions of the word
     */
    private definitions: String[];

    /**
     * @property International Phonetic Alphabet spelling
     */
    private ipaSpelling: String;

    /**
     * Populate word data
     * @param {object} reqRes JSON object returned from Merriam-Webster API request
     */
    public constructor(reqRes: object) {
        this.name = reqRes['meta']['id'].split(':')[0];
        this.partOfSpeech = reqRes['fl'];
        this.etymology = reqRes['et']; //TODO: split this into string
        this.firstUse = reqRes['date']; //TODO: remove 'circa'
        //TODO definition
        //TODO ipa
    }

    /**
     * Return first recorded use
     * @returns {String}
     */
    public getFirstUse(): String {
        return this.firstUse;
    }

    /**
     * Return name of word as string
     * @returns {String}
     */
    public toString(): String {
        return this.name;
    }

    /**
     * Return part of speech
     * @returns {String}
     */
    public getPartOfSpeech(): String {
        return this.partOfSpeech;
    }

    public getEtymology(): String[] {
        return this.etymology;
    }
}