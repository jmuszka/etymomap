import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-4o-mini',
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
