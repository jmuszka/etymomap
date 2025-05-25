const OpenAI = require("openai");
const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const processEtymologyIntoList = async (input) => {
        
        const chatCompletion = await client.chat.completions.create({
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

const simplifyDefinition = async(input) => {
      const chatCompletion = await client.chat.completions.create({
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
                      Sometimes this API spits out the definition with weird formatting or sentence fragments. There should be a period at the end.
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

const getCountriesFromLanguage = async(input) => {
      const chatCompletion = await client.chat.completions.create({
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
                text: `I am going to provide you with a language that is the origin of an English word. Give me the country/countries (comma-separated list) that this language originates from.

                      Do not include any new world countries UNLESS it's an indigienous language.

                      Anything mentioning Latin should be "Italy,Spain,Portugal,France,Romania." Germanic should be "Germany,Austria,Netherlands,Denmark,...". Arabic is "Saudi Arabia,Qatar,United Arab Emirates,Oman,Yemen".

                      Remember, ONLY the countries where it was originally spoken. No colonies are anything like that.

                      The language is: ${input}
                `
              }
            ]
          }
        ],
        model: 'gpt-4o-mini',
      });
    
      if (chatCompletion.choices[0].message.content == null) return "";
      return chatCompletion.choices[0].message.content;
}

module.exports =  {processEtymologyIntoList, simplifyDefinition, getCountriesFromLanguage};