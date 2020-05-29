const jwt = require('jwt-simple');
const moment = require('moment');
const configs = require('./config');

exports.createToken = user => {
    const payload = {
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, configs.TOKEN_SECRET);
};