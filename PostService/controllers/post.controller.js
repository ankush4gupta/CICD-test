const express = require("express");
const Post = require("../models/post.model");
const router = express.Router();

router.get("/posts", async (req, res) => {
    const posts = await Post.find().lean().exec();
    return res.status(200).send(posts);
});

router.post("/posts", async (req, res) => {
    const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
    });
   
    return res.status(200).send(post);
});
//  post id
router.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean().exec();
        if(!post){
            return res.status(404).send({})
        }
        return res.status(200).send(post);
    } catch {
       
        res.status(501).send({ error: error.message });
    }
});


//  user id 

router.get("/posts/user/:id", async (req, res) => {
    try {
        const post = await Post.find({userId:req.params.id}).lean().exec();
        if (!post) {
            return res.status(404).send({})
        }
        return res.status(200).send(post);
    } catch {

        res.status(501).send({ error: error.message });
    }
});



router.patch("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate( req.params.id,req.body,{new:true});
        return res.status(200).send(post);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});

router.delete("/posts/:id", async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});

module.exports = router;
