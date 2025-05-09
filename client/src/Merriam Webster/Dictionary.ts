import {Word} from './Word.ts';
import {DictionaryError} from './DictionaryError.ts';

/**
 * Wrapper class to interface the Merriam-Webster API
 */
export class Dictionary {
    private readonly API_KEY: String;

    /**
     * Store API key
     * @param key Merriam-Webster API key
     */
    public constructor(key: String|undefined) {
        if (key) this.API_KEY = key;
    }

    /**
     * Search the Merriam-Webster database for a word
     * @param word word to search up in dictionary
     * @returns {Word[]} list of words that match query, with associated information
     */
    public async search(word: String) {

        const results = await this.getJSON(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${this.API_KEY}`);

        // Get only words that strict match given string
        
        let words: Word[]= [];

        for (var result of results) {
            if (typeof result !== "object") throw new DictionaryError(`Word "${word}" not found in dictionary.`);
            let w = new Word(result)

            if (w.toString() === word) {
                words.push(new Word(result));
            }
        }

        return words;
    }

    /**
     * Auxiliary function to make the JSON request
     * @param url JSON request URL
     * @returns {object}
     */
    private async getJSON(url: string): Promise<any> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText); // Throw an error for unsuccessful responses
        }
        return await response.json(); // Return the parsed JSON data
    }
}