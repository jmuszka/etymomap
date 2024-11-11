import dotenv from 'dotenv';
import readline from 'readline-sync';
import {Dictionary} from '../Merriam Webster/Dictionary.ts';
import {EtymologyBot} from '../OpenAI/EtymologyBot.ts';

dotenv.config();

const client = new EtymologyBot(process.env['OPENAI_API_KEY']);
const d = new Dictionary(process.env['MERRIAM_WEBSTER_API_KEY']); // this object allows us to query words

let word: string = readline.question();

while(word!="") {

  // Print info
  try {
    let m = await d.search(word);
    let gptList = await client.processEtymologyIntoList(m[0].getEtymology());

    console.log()
    console.log(m[0].toString())
    console.log(m[0].getFirstUse().replace(/circa|{.*}/, ""))
    console.log(gptList.split(/,/))

    console.log(m[0].getDefinitions())
  } catch (e) {
    console.log(e);
  }

  word = readline.question();
}
