import {Word} from './Merriam Webster/Word'

export interface WordOption {
    word: string;
    definition: string;
    wordIndex: number;
    definitionIndex: number;
    ref: Word;
    value?: string;
    label?: string;
}