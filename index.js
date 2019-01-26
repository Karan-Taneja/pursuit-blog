const express = require('express');
const app = express();

//Routers
const UserRouter = require('./routes/user');
const PostRouter = require('./routes/post');
const CommentRouter = require('./routes/post');

const port = 3000;

app.use('/user', UserRouter);
app.use('/post', PostRouter);
app.use('/comment', CommentRouter);

app.use((req, res) => {
    res.status('404')
    res.json({'Error':'Path not Found'})
})

app.listen(port, () => {
    console.log('Now listening to port: ', port)
})