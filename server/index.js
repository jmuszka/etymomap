const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const {processEtymologyIntoList, simplifyDefinition} = require("./llm.js")

const app = express()
app.use(cors())
const port = 5000

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
