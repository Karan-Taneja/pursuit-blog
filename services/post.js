const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/blog');

const PostService = {};

module.exports = PostService;