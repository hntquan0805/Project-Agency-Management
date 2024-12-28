const { Account } = require('../models/account');

class UserController {
    static login = async (name, password) => {
        try {
            const account = await Account.findOne({ where: { name: name, password: password } });
            if (account) {
                return { success: true };
            } else {
                return { success: false, message: 'Invalid credentials' };
            }
        } catch (error) {
            console.error('Error during login:', error);
            return { success: false, message: 'An error occurred while processing your request.' };
        }
    }
}

module.exports = UserController;