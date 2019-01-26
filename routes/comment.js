const express = require('express');
const CommentRouter = express.Router();
const CommentService = require('../services/comment');
const {check, verify}= require('../services/authentication');


CommentRouter.post('/', check, verify, (req, res) => {

    console.log('make comment');

    const {author, title, body, post_id} = req.body

    CommentService.create(author, title, body, post_id)
        .then(() => {
            res.json({'message': 'successfully posted comment'})
        })
        .catch(error => {
            res.json({'error':error.stringify()})
        });

});

CommentRouter.get ('comment/:comment_id', (req, res) => {
    
    console.log('show comment')

    const {id} = req.params

    CommentService.read(id)
        .then((data) => {
            res.json({'data' : data})
        })
        .catch(error => {
            res.json({'error':error.stringify()})
        });

});

CommentRouter.put('/:comment_id', check, verify, (req, res) => {
    
    console.log('edit comment')

    const {id} = req.params
    const {title, body} = req.body

    CommentService.update(id, title, body)
    
    .then((data) => {
        res.json({'data' : data.toString()})
    })
    .catch(error => {
        res.json({'error':error.stringify()})
    });

});

CommentRouter.delete('/:comment_id', check, verify, (req, res) => {
    
    console.log('delete comment')

    const {id} = req.params

    CommentService.delete(id)
    .then(() => {
        res.json({'message' : 'comment successfully deleted.'})
    })
    .catch(error => {
        res.json({'error':error.stringify()})
    });

});

module.exports = CommentRouter;