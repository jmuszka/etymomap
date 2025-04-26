import OpenAI from 'openai';

// Not sure exactly what features this class will have yet, will decide after solidifying the Merriam Webster API functionality

export class EtymologyBot {
    private readonly client: OpenAI;

    public constructor(key: string|undefined) {
        this.client = new OpenAI({apiKey: key, dangerouslyAllowBrowser: true});
    }

    public async processEtymologyIntoList(input: string): Promise<string> {
        const chatCompletion = await this.client.chat.completions.create({
          messages: 
          [
            {
              role: 'system',
              content: [
                {
                  type: 'text',
                  text: `You are a helpful assistant for an app that provides users with information about the etymology of the 
                        English language.`
                }
              ]
            },
            { 
              role: 'user', 
              content: [
                {
                  type: 'text',
                  text: `I am going to provide you a sentence that contains the names of multiple different languages.
                          I need you to provide me the names of the languages in a comma separated list, like "English,Old French,Latin,Greek".

                          ` + input
                }
              ]
            }
          ],
          model: 'gpt-4o-mini',
        });
      
        if (chatCompletion.choices[0].message.content == null) return "";
        return chatCompletion.choices[0].message.content;
    }

    public async simplifyDefinition(input: string): Promise<string> {
      const chatCompletion = await this.client.chat.completions.create({
        messages: 
        [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: `You are a helpful assistant for an app that provides users with information about the etymology of the 
                      English language.`
              }
            ]
          },
          { 
            role: 'user', 
            content: [
              {
                type: 'text',
                text: `I am going to provide you a definition I got from a dictionary API.
                      Sometimes this API spits out the definition with weird formatting or sentence fragments.
                      Give me back a simplified, streamlined version of the definition without losing details and remove unnecessary punctuation:

                        ` + input
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