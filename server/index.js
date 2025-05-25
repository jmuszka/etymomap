const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const {processEtymologyIntoList, simplifyDefinition} = require("./llm.js")

const app = express()
app.use(cors())
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/api/openai/etymology', async (req, res) => {

  const {etymologyList} = req.body

  const response = await processEtymologyIntoList(etymologyList)

  res.send({list: response}).status(200)
})

app.post('/api/openai/definition', async (req, res) => {

  const {definition} = req.body

  const response = await simplifyDefinition(definition)

  res.send({definition: response}).status(200)

})

app.post('/api/mw/search', async (req, res) => {
  const {word} = req.body;

  const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.MERRIAM_WEBSTER_API_KEY}`);
  res.send(await response.json()).status(200); // Return the parsed JSON data
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
