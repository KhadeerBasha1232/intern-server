const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
const cors = require("cors")
const {MongoClient} = require('mongodb')
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(express.json())
app.use(cors({
  origin : "*"
}))


app.use('/api/auth',require('./routes/auth.js'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


connectToMongo()

