
const {MongoClient} = require('mongodb')


const uri = "mongodb+srv://admin:admin@cluster0.lctuidz.mongodb.net/test";
const client = new MongoClient(uri);
const db = client.db("web");
const col = db.collection("buy");

app.post('/buy',(req,res) => {
    console.log(req.body);
    col.insertOne(req.body);
    res.send("Insert Successfull");
})
