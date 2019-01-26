const pgp = require('./pgp')

const CommentService = {};

/*

#### ❌ POST /comment
#### ✅ GET /comment/:comment_id
#### ❌ PUT /comment/:comment_id
#### ❌ DEL /comment/:comment_id

*/

CommentService.create = (author, title, body, post_id) => {
    return db.none('INSERT INTO comments (author, title, body, post_id) VALUES (${author}, ${title}, ${body}, ${post_id})', {author, title, body, post_id})
};

CommentService.read = (id) => {
    return db.one('SELECT * FROM comments WHERE comments.id=${id}', {id})
};

CommentService.update = (id, title, body) => {
    return db.one('UPDATE comments SET title=${title}, body=${body} WHERE comments.id=${id}', {id, title, body})
};

CommentService.delete = (id) => {
    return db.none('DELETE FROM comments WHERE comments.id=${id}', {id})
};

module.exports = CommentService;