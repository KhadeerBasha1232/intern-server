const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
const cors = require("cors")
const {MongoClient} = require('mongodb')

app.use(express.json())
app.use(cors({
  origin : "*"
}))


app.use('/api/auth',require('./routes/auth.js'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


connectToMongo()

