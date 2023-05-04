const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
const cors = require("cors")
const compression = require('compression');
app.use(compression());


app.use(express.json())
app.use(cors({
  origin : "*"
}))


app.use('/api/auth',require('./routes/auth.js'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


connectToMongo()

