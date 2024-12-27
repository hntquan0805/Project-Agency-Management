const { User } = require('../models/user');

class UserController {
    static login = async (name, password) => {
        try {
            const user = await User.findOne({ where: { name: name, password: password } });
            if (user) {
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