const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const service = require('../config/service');

exports.emailSignup = (req, res) => {
    const name = req.body.name;
    const username = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    const SALT_ROUNDS = 12;

    bcrypt.hash(password, SALT_ROUNDS)
    .then(hashedPwd => {
        const user = new User({
            name: name,
            user: username,
            email: email,
            pwd: hashedPwd
        });

        user.save(err => {
            return res
                    .status(200)
                    .send({token: service.createToken(user)});
                    
        });
    })
    .catch(err => {
        console.error(err);
    });
};

exports.emailLogin = (req, res) => {
    User.findOne({email: req.body.email.toLowerCase()}, (err, user) => {

        return res
                .status(200)
                .send({token: service.createToken(user)});
    });
};