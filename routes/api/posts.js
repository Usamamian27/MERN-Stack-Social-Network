// authentication info


const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');
const passposrt = require('passport');


// Post Model
const Post = require('../../models/Post');
//Profile Model
const Profile = require('../../models/Profile');


// Validation for Post
const validatePostInput = require('../../validations/post-validations');


// route Get api/posts/test
// desc Tests post route
//access public
router.get('/test',(req,res)=>{

    res.json({msg: "Posts Works"});
});


// route Get api/posts
// desc Get posts
//access public

router.get('/',(req,res)=>{
    Post.find()
        .sort({date: -1})
        .then(post => res.json(post))
        .catch(err => res.status(404).json({msg:'No posts found'}));
});


// route Post api/posts
// desc Create post
//access private
router.post('/',passposrt.authenticate('jwt',{session:false}),(req,res)=>{

    const { errors , isValid} = validatePostInput(req.body);

    //Check validation
    if(!isValid){
        // If any errors , send 400 with error object
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    });

    newPost.save().then(post => res.json(post));
});


// route Get api/posts
// desc Get Single post by id
//access public

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({msg : 'No post found for this id'}));
});

// route Delete api/posts/:id
// desc Delete post
//access private


router.delete('/:id',passposrt.authenticate('jwt',{session:false}),(req,res)=> {

    Profile.findOne({user : req.user.id})
        .then(profile =>{

            Post.findById(req.params.id)
                .then(post =>{
                    // Check for Post Owner
                    if(post.user.toString() !== req.user.id){
                        return res.status(401).json({nonAuthorized :'User is Not Authorized'});
                    }

                    // Delete Post
                    post.remove()
                        .then(()=>{
                            res.json({success : true})
                        })
                        .catch(err => res.status(404).json({postNotFound:'No Post Found'}));
                });
        });
});


// route Post api/posts/like/:id
// desc Like post
//access private

router.post('/like/:id',passposrt.authenticate('jwt',{session:false}),
    (req,res)=>
{

    Profile.findOne({user: req.user.id})
        .then(profile => {

            Post.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        return res.status((400).json({alreadyLiked:'User already liked this post'}))
                    }

                    // Add user id to likes array to like the post
                    post.likes.unshift({user : req.user.id});
                    // save to mongoDB
                    post.save().then(post => res.json(post) );

                })
                .catch(err => res.status(404).json({postNotfound:'No Post Found'}));

        });

});


// route Post api/posts/unlike/:id
// desc UnLike post
//access private

router.post('/unlike/:id',passposrt.authenticate('jwt',{session:false}),
    (req,res)=>
    {

        Profile.findOne({user: req.user.id})
            .then(profile => {

                Post.findById(req.params.id)
                    .then(post => {
                        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                            return res.status((400).json({notLiked:'you have not yet liked this post'}))
                        }

                        // Get remove index
                        const removeIndex = post.likes
                            .map(item => item.user.toString())
                            .indexOf(req.user.id);

                        // Splice it out of array
                        post.likes.splice(removeIndex, 1);
                        //save
                        post.save().then(post => res.json(post));

                    })
                    .catch(err => res.status(404).json({postNotfound:'No Post Found'}));

            });

    });



// route Post api/posts/comment/:id
// desc Add comment to  post
//access private

router.post('/comment/:id',passposrt.authenticate('jwt',{session:false}),
    (req,res)=>{

        const { errors , isValid} = validatePostInput(req.body);

        //Check validation
        if(!isValid){
            // If any errors , send 400 with error object
            return res.status(400).json(errors);
        }

    Post.findById(req.params.id)
        .then(post =>{
            const newComment ={
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user:req.user.id
            };

            // Add comment to comments array
            post.comments.unshift(newComment);
            //save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({nopostfound:'No Post Found'}));

});


// route Delete api/posts/comment/:id/:comment_id
// desc remove comment to  post
//access private

router.delete('/comment/:id/:comment_id',passposrt.authenticate('jwt',{session:false}),
    (req,res)=>{

        Post.findById(req.params.id)
            .then(post =>{

                // Check to see if the comment exist
                if(
                    post.comments.filter(
                    comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res.status(404).json({commentnotexist:'Comment not Exist'});
                }

                // get an index to remove
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Splice out of array
                post.comments.splice(removeIndex,1);
                //save
                post.save().then(post => res.json(post));


            })
            .catch(err => res.status(404).json({nopostfound:'No Post Found'}));

    });




module.exports = router;