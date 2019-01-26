const express = require('express');
const PostRouter = express.Router();
const PostService = require('../services/post');

PostRouter.post('/', (req, res) => { //Private
    
    console.log('create post');

    const {author, title, body} = req.body;

    PostService.create(author, title, body)
        .then(() => {
            res.json({'message':'successfully created post'})
        })
        .catch(error => {
            res.json({'error':error.stringify()})
        });
});

PostRouter.get ('post/:post_id', (req, res) => {
    
    console.log('show post');

    const {id} = req.params;

    PostService.read(id)
        .then((data) => {
            res.json({'data':data})
        })
        .catch(error => {
            res.json({'error':error.stringify()})
        });

});

PostRouter.get('post/:post_id/comment/', (req, res) => {
    
    console.log('get all posts by post');

    const {id} = req.params;

    PostService.readAllPostsComments(id)
    .then((data) => {
        res.json({'data':data})
    })
    .catch(error => {
        res.json({'error':error.stringify()})
    });

});

PostRouter.get('post/:post_id/comments/:comment_id',(req, res) => {
    
    console.log('get specific post by post');

    const {id, comment_id} = req.params;

    PostService.readPostsComment(id, comment_id)
        .then((data) => {
            res.json({'data':data})
        })
        .catch(error => {
            res.json({'error':error.stringify()})
        });
    
});

PostRouter.update('/:post_id', (req, res) => { // Private
    
    console.log('edit post by id');

    const {id} = req.params;
    const {title, body} = req.body;

    PostService.update(id, title, body)
        .then(data => {
            console.log(data)
            res.json({'data':data.stringify()})
        })
            .catch(error => {
            res.json({'error':error.stringify()});
        });

});

PostRouter.delete('/:post_id', (req, res) => { // Private
    
    console.log('delete post by id');

    const {id} = req.params;

    PostService.delete(id)
        .then(() => {
            res.json({'message':'successfully deleted user'})
        })
        .catch(error => {
            res.json({'error':error.stringify()})
        });

});

module.exports = PostRouter;