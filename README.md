# EtymoMap
AI-powered app to explore the etymology of the English language.

#### (IN DEVELOPMENT)

## Description
From the viking invasions to the Norman-French conquest in 1066, and from post-Renaissance neologisms to its status as a global lingua franca, the English language boasts a fascinating history and development. Despite its origins as a West Germanic language, over two-thirds of the English lexicon consists of Romance vocabulary, mainly from French and Latin, with significant influence from Old Norse, Greek, and many others as well.

I have always enjoyed analyzing the linguistic origins of the vocabulary I come across in day-to-day life, so I decided to create an app to streamline the process. With EtymoMap, users can enter any word in the English language and receive various linguistic data surrounding its etymology and other attributes.

Built using TypeScript, React, Merriam-Webster, OpenAI's GPT-4o, & Globe.gl

## Features

Search
- Search for any English word in the dictionary, and click to view its information.

Origin
- Learn which language(s) the word originates from, and roughly when it entered the English lexicon.
- Zoom-in and highlight the countries of origin on a 3D interactive globe.
- Discover which language families a word belongs to (ie. 25% West Germanic, 25% North Germanic, 50% Romance), visualized in chart-form.

History
- Read the history of how the word came to be part of the English language. Many words have suprisingly interesting stories behind them!
- Check out ancestor forms of the word from before it entered modern English.

Phonetics
- Obtain the International Phonetic Alphabet (IPA) spelling of the word.

## Usage

Visit [etymomap.com](https://etymomap.com) to use the app.

Alternatively, you can host it yourself with the following steps:

1. `git clone https://github.com/jmuszka/etymomap.git && cd etymomap/`
2. `npm i -g bun`
3. `cd server/ && bun i`, followed by `bun run dev` to run the backend.
> [!TIP]
> Run `cp example.env .env` and add your API keys and which port you want the backend to run on.
4. `cd client/ && bun i`, followed by `bun run dev` to run the frontend.
> [!TIP]
> Run `cp example.env .env` and add the URL that can access your backend.
5. Visit `localhost:3000` in your preferred browser.
