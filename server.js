const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const path = require('path')
const port = process.env.PORT || 5000
const clientPath = path.join(__dirname, 'client')
const mongoUrl = 'mongodb+srv://user_1:123@cluster0-hbits.mongodb.net/test?retryWrites=true';


const app = express()

app.use(express.static(clientPath))

app.get('/', function (req, res)
{
    MongoClient.connect(mongoUrl, {useNewUrlParser: true} ,function(err, client) {
        client.db("TestDB").collection("test").find({}).toArray(function(err, testdb){
            res.send(testdb);            
            client.close();
        });
    });
});
app.listen(port,()=>{
	console.log(`Server run on ${port} port`)
})
