const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/blog');

const UserService = {};

module.exports = UserService;