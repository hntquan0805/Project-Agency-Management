const { User } = require('../models');

async function createUser(data) {
    try {
        const newUser = await User.create(data);
        return { success: true, user: newUser };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = { createUser };
