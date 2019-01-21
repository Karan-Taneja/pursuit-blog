const express = require('express');
const app = express();

//Routers
const UserRouter = require('./routes/user');
const PostRouter = require('./routes/post');
const CommentRouter = require('./routes/post');
const PublicRouter = require('./routes/public')

const port = 3000;

// Public Routes
app.use('/', PublicRouter)

// Private Routes
// app.user(authentication)
app.use('/user', UserRouter);
app.use('/post', PostRouter);
app.use('/comment', CommentRouter);

app.listen(port, () => {
    console.log('Now listening to port: ', port)
})