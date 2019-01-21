const express = require('express');
const PublicRouter = express.Router();
const UserService = require('../services/user');
const PostService = require('../services/post');
const CommentService = require('../services/comment')

//----USER ROUTES

PublicRouter.post ('/user/', (req, re) => {
    console.log('create user')
})
PublicRouter.post ('/user/login', (req, re) => {
    console.log('login as user')
})
PublicRouter.get ('/user/:user_id', (req, re) => {
    console.log('show user')
})

//-----USER-POST ROUTES

PublicRouter.get('/user/:user_id/posts/', (req, re) => {
    console.log('get all posts by user')
})
PublicRouter.get('/user/:user_id/posts/:post_id',(req, re) => {
    console.log('get specific post by user')
})

//----USER-COMMENT ROUTES
PublicRouter.get('/user/:user_id/comments/',(req, re) => {
    console.log('get all comments by user')
})
PublicRouter.get('/user/:user_id/comments/:comment_id',(req, re) => {
    console.log('get specific comment by user')
})

//------POST ROUTES

PublicRouter.get ('/post/:post_id', (req, re) => {
    console.log('show post')
})

//------POST COMMENT ROUTES

PublicRouter.get('/post/:post_id/comment/', (req, re) => {
    console.log('get all posts by post')
})
PublicRouter.get('/post/:post_id/comments/:comment_id',(req, re) => {
    console.log('get specific post by post')
})

//------COMMENT ROUTES

PublicRouter.get ('/comment/:comment_id', (req, re) => {
    console.log('show comment')
})

module.exports = PublicRouter;