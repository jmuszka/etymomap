import dotenv from 'dotenv';
import readline from 'readline-sync';
import {Dictionary} from '../Merriam Webster/Dictionary.ts';
import {EtymologyBot} from '../OpenAI/EtymologyBot.ts';

dotenv.config();

const client = new EtymologyBot(process.env['OPENAI_API_KEY']);
const d = new Dictionary(process.env['MERRIAM_WEBSTER_API_KEY']); // this object allows us to query words

// Enter the word
let word: string = readline.question();
let response = await client.callOpenAI(word);
console.log(response);

// Print info
try {
  let m = await d.search(word);
  console.log();
  console.log(`WORD: ${m[0].toString()}`);
  console.log(`FIRST USE: ${m[0].getFirstUse()}`);
  console.log(`ETYMOLOGY: ${m[0].getEtymology()}`);
} catch (e) {
  console.log("Word not found.");
}