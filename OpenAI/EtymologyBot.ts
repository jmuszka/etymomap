import OpenAI from 'openai';

// Not sure exactly what features this class will have yet, will decide after solidifying the Merriam Webster API functionality

export class EtymologyBot {
    private readonly client: OpenAI;

    public constructor(key: string) {
        this.client = new OpenAI({apiKey: key,});
    }

    public async callOpenAI(word: string): Promise<String> {
        const chatCompletion = await this.client.chat.completions.create({
          messages: 
          [
            {
              role: 'system',
              content: [
                {
                  type: 'text',
                  text: `You are a helpful assistant for an app that provides users with information about the etymology of the 
                        English language. Simply give the language where the word comes from, nothing else. Respond with either:
                        French, Old French, Old English, Old Norse, Italian, Latin, Hindu, Greek.`
                }
              ]
            },
            { 
              role: 'user', 
              content: [
                {
                  type: 'text',
                  text: 'Fill in the blank: the word "' + word + '" comes from the _ language.'
                }
              ]
            }
          ],
          model: 'gpt-4o-mini',
        });
      
        if (chatCompletion.choices[0].message.content == null) return "";
        return chatCompletion.choices[0].message.content;
    }
}