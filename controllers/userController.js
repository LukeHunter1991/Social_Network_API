// Thought object used to delete associated thoughts in deleteUser route.
const { User, Thought } = require('../models');

module.exports = {
    // Get route to show all users - /api/users
    async getUsers(_req, res) {
        try {
            // Returns an array with all users
            const allUsers = await User.find().select('-__v');
            res.json(allUsers);
        } catch (err) {
            return res.status(500).json(err);
        }

    },

    // Get route to show a single user - /api/users/:userId
    async getSingleUser(req, res) {
        try {
            // Look up single user with userID parameter.
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');

            // If no result from above method, no user matches that id.
            if (!user) {
                return res.status(404).json({ message: 'No user found. Try a different ID'})
            };
            // Return details of single user
            return res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Post route to add a user - /api/users
    async CreateUser(req, res) {
        try {
            // Create new user from data in body.
            const user = await User.create(req.body);
            // Return details of created user to verify success.
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // put route to update user data - /api/users/:userId
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                // Find user by id in param
                req.params.userId,
                // Update with data in body of request.
                req.body,
                // Validates data, return updated user.
                { runValidators: true, new: true }
            );
            // If no user, could not find a matching id.
            if (!user) {
                return res.status(404).json({ message: 'No user found. Try a different ID'})
            }
            return res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // Delete route to delete one user and associated thought data - /api/users/:userId
    async deleteUser(req, res) {
        try {
            // Find and delete based on id in params.
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            // If no user variable, no user could be found with that ID.
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            // Delete thoughts associated with that user.
            const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } });

            // Create a delete message to return on succesful deletion.
            let deleteMessage = 'User deleted!';
            // Update delete message depending if thoughts were deleted, or jsut user.
            if (thoughts.deletedCount) {
                deleteMessage = 'User and thoughts deleted!';
            }

            res.json({ message: deleteMessage })

        } catch (err) {
            res.status(500).json(err);
        }
    }
};