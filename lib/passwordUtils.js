const crypto = require('crypto');

function genPassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, `sha512`).toString(`hex`);
    return {
        salt, hash
    };
}

function validPassword(password, hash, salt) {
    const createdHash = crypto.pbkdf2Sync(password, salt, 10000, 64, `sha512`).toString(`hex`);
    return createdHash == hash;
}

module.exports.genPassword = genPassword;
module.exports.validPassword = validPassword;