const express = require('express');
const UserRouter = express.Router();

const UserService = require('../services/user');
const Authentication = require('../services/authentication');

UserRouter.post ('/', (req, res) => {
    
    console.log('create user');
    
    const {username, email, password} = req.body;
    UserService.create(username, email, password)
        .then(() => {
            res.status(200)
            res.json({'messages': 'user successfully created'})
        })
        .catch(error => {
            res.json({'error': error.stringify()})
        });

});

UserRouter.get ('/:user_id', (req, res) => {
    
    console.log('show user');

    const {id} = req.params;

    UserService.readUser(id)
        .then(data => {
            console.log(data)
            res.json({'data':data.stringify()})
        })
        .catch(error => {
            res.json({'error': error.stringify()})
        });
});

UserRouter.post ('/login', (req, res) => { //requires bcrypt & uuid?
    
    console.log('login as user');

    const {username, email, password} = req.body;

    login(username, email, password)
        .then(data => {
            console.log(data)
            res.json({'message':'successfully logged in'});
        })
        .catch(error => {
            res.json({'error':error.stringify()});
        });

});

UserRouter.put('/:user_id', (req, res) => { /* Private */
    
    console.log('updated user by id');

    const {id} = req.params;
    const {username, email, password} = req.body;

    UserService.update(id, username, email, password)
        .then(data => {
            console.log(data)
            res.json({'data':data.stringify()})
        })
            .catch(error => {
            res.json({'error': error.stringify()});
        })
});

UserRouter.delete('/:user_id', (req, res) => { /* Private */
    
    console.log('delete user');

    const {id} = req.params;

    UserService.delete(id)
        .then(() => {
            res.json({'message':'successfully deleted user'})
        })
        .catch(error => {
            res.json({'error': error.stringify()})
        });
});

UserRouter.get('/:user_id/posts/', (req, res) => {
    
    console.log('get all posts by user');

    const {id} = req.params;

    UserService.readAllUsersPosts(id)
        .then(data => {
            res.json({'data':data.stringify()})
        })
        .catch(error => {
            res.json({'error': error.stringify()})
        });
});

UserRouter.get('/:user_id/posts/:post_id',(req, res) => {
    
    console.log('get specific post by user');

    const {id, post_id} = req.params;

    UserService.readUsersPost(id, post_id)
        .then(data => {
            res.json({'data':data.stringify()})
        })
        .catch(error => {
            res.json({'error': error.stringify()})
        });
});

UserRouter.get('/:user_id/comments/',(req, res) => {
    
    console.log('get all comments by user');

    const {id} = req.params;

    UserService.readAllUsersComments(id)
        .then(data => {
            res.json({'data':data.stringify()})
        })
        .catch(error => {
            res.json({'error': error.stringify()})
        })
});

UserRouter.get('/:user_id/comments/:comment_id',(req, res) => {
    
    console.log('get specific comment by user');

    const {id, comment_id} = req.params;

    UserService.readUsersComment(id, comment_id)
        .then(data => {
            res.json({'data':data.stringify()})
        })
        .catch(error => {
            res.json({'error': error.stringify()})
        });
});

module.exports = UserRouter;