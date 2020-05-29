const mongoose = require('mongoose');
const service = require('../config/service');

const User = mongoose.model('User', {
    name: String,
    user: String,
    email: String,
    pwd: String
});

exports.emailSignup = (req, res) => {
    const name = req.body.name;
    const username = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        name: name,
        user: username,
        email: email,
        pwd: password
    });

    user.save(err => {
        return res
                .status(200)
                .send({token: service.createToken(user)});
                
    });
};

exports.emailLogin = (req, res) => {
    User.findOne({email: req.body.email.toLowerCase()}, (err, user) => {

        return res
                .status(200)
                .send({token: service.createToken(user)});
    });
};