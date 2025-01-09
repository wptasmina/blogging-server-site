const express = require("express");
const cors = require("cors");
require("dotenv").config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-1.fmah5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1`;

//middleware
app.use(express.json())
app.use(cors());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const blogUserCollection = client.db("blog-discover").collection("blogger");


    //add blogs
    app.post('/blogger', async(req, res)=>{
      const newAddBlog = req.body;
      const result = await blogUserCollection.insertOne(newAddBlog)
      res.status(201).send(result);
    });

    app.get('/blog', async(req, res)=>{
      const result = await blogUserCollection.find().sort({_id: -1}).toArray();
      res.send(result)
    })
 

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    //  await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("Blog Site")
})

app.listen(port, ()=>{
    console.log('Server running...')
})

// http://localhost:5000/



