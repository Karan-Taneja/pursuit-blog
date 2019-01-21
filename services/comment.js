const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/blog');

const CommentService = {};

module.exports = CommentService;