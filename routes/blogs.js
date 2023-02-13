const express = require('express');
const router = express.Router();

//instantiate mongodb 
const { db } = require('../mongo');
//----------------------------------------------------
/* GET all blogs. */
router.get('/all', async function(req, res, next) {
  const blogs = await db()
  .collection('sample_blogs')
  .find({})
  .limit(5)
  .toArray(function(err, result){
      if (err) {
        res.status(400).send("error fetching blogs")
      } else {
        res.json(result);
      }
    }); 
    
    res.json({
      sucess:true,
      blogs: blogs
    });

}); 
//----------------------------------------------------
//---/get-one/:id (GET): returns one blog post given an id
router.get('/get-one/:id', async function(req, res, next) {
  const getBlog = await db()
  .collection('sample_blogs')
  .findOne({
    id: req.params.id
  })
  
    
    res.json({
      sucess:true,
      getBlog
    });

}); 
//----------------------------------------------------
//-- /get-one/ (GET): returns one blog post
router.get("/get-one", async function(req,res,next){
  const getBlog = await db()
  .collection('sample_blogs')
  .findOne({
    id:{
      $exists: true,
    }
  })
  
    
    res.json({
      sucess:true,
      getBlog
    });
})
//----------------------------------------------------
router.post("/create-one", async function (req,res,next){
  try{
    const newPost = {
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      email: req.body.email,
      categories: req.body.categories,
      starRating: Number(req.body.starRating)
      };
    
    const insertOpRes = await db()
    .collection("posts")
    .insertOne(newPost);
    
    res.json({
      success: true,
      newPost
    })
    }catch(e){
      console.log(typeof e)
      console.log(e)
      res.json({
        error: e.toString()
      })
    }
})
//----------------------------------------------------


module.exports = router;