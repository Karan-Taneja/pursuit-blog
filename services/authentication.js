const uuid = require('uuid/v1');
const bcrypt = require('bcrypt');
const UserService = require('./user');

const login = (username=null, email=null, password) => {
    
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

const verify = (id=null, username=null, author=null, token) => {
    if(id){
        UserService.readUser(id)
            .then(data => {
                if(data.token !== token){
                    res.json({'error':'not logged in'});
                }
                else{
                    return true;
                };
            })
            .catch(error => {
                res.json({'error': error.stringify()});
            })
    }
    else if(username || email){
        UserService.readUserNotByID(username, email)
        .then(data => {
            if(data.token !== token){
                res.json({'error':'not logged in'});
            }
            else{
                return true;
            };
        })
        .catch(error => {
            res.json({'error': error.stringify()});
        })
    }
}

module.exports = {login, verify};

