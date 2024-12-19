const crypto = require('crypto');
const { User } = require('../models/user');

async function hashPassword(password) {
    const salt = crypto.randomBytes(16);
    const keylen = 64;
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, keylen, (err, derivedKey) => {
            if (err) reject(err);
            resolve({ hashedPassword: derivedKey.toString('hex'), salt: salt.toString('hex') });
        });
    });
}

async function signUpUser(username, password) {
    // try {
        const { hashedPassword, salt } = await hashPassword(password);
        const newUser = await db.User.create({ 
            username, 
            password: hashedPassword, 
            salt 
        });
        return { success: true, user: newUser };
    // } catch (error) {
    //     return { success: false, message: error.message };
    // }
}

module.exports = { signUpUser };