const pgp = require('./pgp')
const PostService = {};

/*

## POST
#### ❌ POST /post
#### ✅ GET /post/:post_id
#### ❌ PUT /post/:post_id
#### ❌ DEL /post/:post_id
#### ✅ GET /post/:post_id/comments
#### ✅ GET /post/:post_id/comments/:comment_id

*/

PostService.create = (author, title, body) => {
    return db.none('INSERT INTO posts (author, title, body) VALUES (${author}, ${title}, ${body})', {author, title, body})
};

PostService.read = (id) => {
    return db.one('SELECT * FROM posts WHERE posts.id=${id}', {id})
};

PostService.readPostsComment = (id, comment_id) => {
    return db.one('SELECT * FROM posts JOIN comments ON comments.post_id=posts.post_id WHERE posts.post_id=${id} AND comments.id=${comment_id}', {id, comment_id})
};

PostService.readAllPostsComments = (id) => {
    return db.any('SELECT * FROM posts JOIN comments ON comments.post_id=posts.post_id WHERE posts.post_id=${id}', {id})
};

PostService.update = (id, title, body) => {
    return db.one('UPDATE posts SET title=${title}, body=${body} WHERE posts.id=${id}', {id, title, body})
};

PostService.delete = (id) => {
    return db.none('DELETE FROM posts WHERE posts.id=${id}', {id})
};

module.exports = PostService;