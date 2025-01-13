const express = require("express");
const cors = require("cors");
require("dotenv").config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    //add blogs get
    app.get('/blog', async(req, res)=>{
      const result = await blogUserCollection.find().sort({_id: -1}).toArray();
      // const result = await blogUserCollection.find().toArray();
      res.send(result)
    })

    app.get('/homeblog', async(req, res)=>{
      const result = await blogUserCollection.find().limit(6).sort({_id: -1}).toArray();
      res.send(result)
    })

  //add blogs post
  app.post('/blogger', async(req, res)=>{
    const newAddBlog = req.body;
    const result = await blogUserCollection.insertOne(newAddBlog)
    res.status(201).send(result);
  });


  // Delete
  app.delete("/deleteBlog/:id",async (req, res)=> {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await blogUserCollection.deleteOne(query)
    res.send(result)
  })


// Get  details blog
app.get('/details/:id', async (req, res) => {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await blogUserCollection.findOne(query)
  res.send(result)
  });
  


// Add comment
app.post('/comments', async (req, res) => {
  try {
    const { blogId, userName, text } = req.body;

    if (!blogId || !userName || !text) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding comment' });
  }
});

// Get comments for a blog
// app.get('/comments/:blogId', async (req, res) => {
//   try {
//     const { blogId } = req.params;
//     if (!isValidObjectId(blogId)) {
//       return res.status(400).json({ message: 'Invalid Blog ID' });
//     }

//     const comments = await Comment.find({ blogId });
//     res.json(comments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching comments' });
//   }
// });

    // const Blog = require('../models/Blog');
    // const Comment = require('../models/Comment');
    
    // // Get blog details
    // router.get('/details/:id', async (req, res) => {
    //   const blog = await Blog.findById(req.params.id);
    //   res.json(blog);
    // });
    
    // // Add comment
    // router.post('/comments', async (req, res) => {
    //   const comment = new Comment(req.body);
    //   await comment.save();
    //   res.json(comment);
    // });
    
    // // // Get comments for a blog
    // router.get('/comments/:blogId', async (req, res) => {
    //   const comments = await Comment.find({ blogId: req.params.blogId });
    //   res.json(comments);
    // });
    

     // update page
    app.get('/blog/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await blogUserCollection.findOne(query)
      res.send(result)
      console.log(result)

    });

    app.put('/blog/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const updateBlog = req.body;
      const updates = {
        $set: {
          userName: updateBlog.userName, 
          email: updateBlog.email, 
          userImage: updateBlog.userImage, 
          title: updateBlog.title, 
          imageUrl: updateBlog.imageUrl, 
          date: updateBlog.date, 
          shortDesc: updateBlog.shortDesc, 
          longDesc: updateBlog.longDesc, 
          category: updateBlog.category
        }
      }

      const result = await blogUserCollection.updateOne(filter, updates, options )
      res.send(result)
    })
// update page End

    //wishlist page
    app.get('/wishlist/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await blogUserCollection.findOne(query)
      res.send(result)
      console.log(result)

    })
    app.get('/wishlist', async(req, res)=>{
      const result = await blogUserCollection.find().toArray();
      res.send(result)

    })

    app.post('/wishlist', async (req, res) => {
      const newAddBlog = req.body;
      const result = await blogUserCollection.insertOne(newAddBlog)
      res.status(201).send(result);
    });
 //wishlist page End
 
  





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
    console.log('Server is running...')
})

// http://localhost:5000/



