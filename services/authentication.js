const uuid = require('uuid/v1');
const bcrypt = require('bcrypt');
const UserService = require('./user');

const login = (req, res, next) => {

    const {username, email, password} = req.body
    
    UserService.readUserNotByID(username, email)
        .then(data => {
            bcrypt.compare(password, data.password, (error, res) => {
                if(err) throw new Error ({'error':error})
                const token = uuid();
                UserService.updateToken(username, email, token);
            })
        })
        .catch(error => {
            res.json({'error':error.stringify()});
        });
}

const verify = (req, res, next) => {

    const {id} = req.params
    const {username, author} = req.body
    const {token} = req.headers

    if(id){
        UserService.readUser(id)
            .then(data => {
                if(data.token !== token){
                    res.json({'error':'not logged in'});
                }
                else{
                    next();
                };
            })
            .catch(error => {
                res.json({'error': error.stringify()});
            })
    }
    else if(username || author){
        UserService.readUserNotByID(username, email)
        .then(data => {
            if(data.token !== token){
                res.status(401)
                res.json({'message' : 'client not authorized'})
            }
            else{
                next();
            };
        })
        .catch(error => {
            res.json({'error': error.stringify()});
        })
    }
}

const check = (req, res, next) => {

    if (req.headers.token) next();
    else{
        res.status(401)
        res.json({'message' : 'client not authorized'})
    }
}

module.exports = {login, verify, check};

