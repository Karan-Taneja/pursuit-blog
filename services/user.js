const pgp = require('./pgp');
const UserService = {};

/*
User Functions

#### ✅ POST /user 
#### ✅ GET /user/:user_id
#### ❌ PUT /user/:user_id
#### ❌ DEL /user/:user_id
#### ✅ GET /user/:user_id/posts
#### ✅ GET /user/:user_id/posts/:post_id
#### ✅ GET /user/:user_id/comments
#### ✅ GET /user/:user_id/comments/:comment_id
#### ✅ POST /user/login

*/

/*
User Aspects:
    -id
    -username
    -email
    -password
    -token (if logged in)
*/


UserService.create = (username, email, password) => {

    return db.none('INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})', {username, email, password})
};

UserService.readUser = (id) => {
    return db.one('SELECT * FROM users WHERE users.id=${id}', {id})
};

UserService.readUserNotByID = (username=null, email=null) => {

    if(username) return db.one('SELECT * FROM users WHERE users.username=${username}', {username})
    if(email) return db.one('SELECT * FROM users WHERE users.email=${email}', {email})

}

UserService.readUsersPost = (id, post_id) => {
    return db.one('SELECT * FROM users JOIN posts ON posts.author=users.id WHERE users.id=${id} AND posts.id=${post_id}', {id, post_id})
};

UserService.readAllUsersPosts = (id) => {
    return db.any('SELECT * FROM users JOIN posts ON posts.author=users.id WHERE users.id=${id}', {id})
};

UserService.readUsersComment = (id, comment_id) => {
    return db.one('SELECT * FROM users JOIN comments ON comments.author=users.id WHERE users.id=${id} AND comments.comment_id = ${post_id}', {id, comment_id})
};

UserService.readAllUsersComments = (id) => {
    return db.any('SELECT * FROM users JOIN comments ON comments.author=users.id WHERE users.id=${id}', {id})
};

UserService.update = (id, username, email, password) => {
    return db.one('UPDATE users SET username=${username}, email=${email}, password=${password}, WHERE users.id=${id}', {id, username, email, password})
};

UserService.updateToken = (username=null, email=null, token) => {
    if(username && token) return db.one('UPDATE users SET token=${token} WHERE users.username=${username}', {username,token})
    else if(email && token) return db.one('UPDATE users SET token=${token} WHERE users.email=${email}', {email, token});
}

UserService.delete = (id) => {
    return db.none('DELETE FROM users WHERE users.id=${id}', {id})
};

module.exports = UserService;