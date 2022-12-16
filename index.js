const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

// middle ware 
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${db_user}:${db_pass}@master-po-cluster.webcm1p.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const users = await client.db('loanTask').collection('users')
        app.get('/', (req, res)=> {
            res.send('Server Running')
        })

        app.post('/add-user', async (req, res)=>{
            let user = req.body;
            let result = await users.insertOne(user);
            res.send({result})
        })
    }
    finally{}
}

run().catch(err=> console.log(err))

app.listen(port, ()=>{
    client.connect(err => {
      if(err) {
        console.log(err)
      }
      else{
        console.log('Database connection established');
      }
      // perform actions on the collection object
    });
    console.log(`Server listening port ${port}`);
})