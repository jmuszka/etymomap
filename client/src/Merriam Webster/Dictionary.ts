import {Word} from './Word.ts';
import {DictionaryError} from './DictionaryError.ts';

/**
 * Wrapper class to interface the Merriam-Webster API
 */
export class Dictionary {

    /**
     * Store API key
     * @param key Merriam-Webster API key
     */
    public constructor() {}

    /**
     * Search the Merriam-Webster database for a word
     * @param word word to search up in dictionary
     * @returns {Word[]} list of words that match query, with associated information
     */
    public async search(word: string) {

        const results = await this.getJSON(word);
        console.log(results)

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
    private async getJSON(word: string): Promise<any> {
        return await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mw/search`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"word": word})
        })
        .then(res => res.json())
    }
}