const bcrypt = require('bcrypt');
const User = require('../models/user');

async function signUpUser(username, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        return { success: true, user: newUser };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

module.exports = { signUpUser };