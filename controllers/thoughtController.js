const { User, Thought } = require('../models');

module.exports = {
    // Get route to show all users - /api/thoughts
    async getThoughts(_req, res) {
        try {
            // Returns an array with all THoughts
            const allThoughts = await Thought.find().select('-__v');
            res.json(allThoughts);
        } catch (err) {
            return res.status(500).json(err);
        }

    },

    // Get route to show a single thought - /api/users/:thoughtId
    async getSingleThought(req, res) {
        try {
            // Look up single thought with thoughtId parameter.
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

            // If no result from above method, no thought matches that id.
            if (!thought) {
                return res.status(404).json({ message: 'No thought found. Try a different ID'})
            };
            // Return details of single thought
            return res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Post route to add a thought - /api/thoughts
    async createThought(req, res) {
        try {
            // Create new thought from data in body.
            const thought = await Thought.create(req.body);

            // Find relevant user based on userId in body.
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                // Add relevant thought to users array
                { $addToSet: { thoughts: thought }},
                // validate and return updated values
                { runValidators: true, new: true }
            );
            // Return details of created thought to verify success.
            // Includes user to show that the thought was added to their array.
            res.json(['Thought created', thought, 'Users thought arrray updated', user]);
        } catch (err) {
            res.status(500).json(err);
        }
    },
     // put route to update thought data - /api/thoughts/:thoughtId
     async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                // Find thought by id in param
                req.params.thoughtId,
                // Update with data in body of request.
                req.body,
                // Validates data, return updated thought.
                { runValidators: true, new: true }
            );
            // If no thought, could not find a matching id.
            if (!thought) {
                return res.status(404).json({ message: 'No thought found. Try a different ID'})
            }
            return res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // Delete route to delete one user and associated thought data - /api/users/:userId
    async deleteThought(req, res) {
        try {
            // Find and delete based on id in params.
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            // If no thought variable, no thought could be found with that ID.
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            // Delete thought associated from the users array.
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                // Delete relevant thought to users array
                { $pull: { thoughts: req.params.thoughtId }},
                // validate and return updated values
                { runValidators: true, new: true }
            )

            res.json({ message: "Thought deleted" })

        } catch (err) {
            res.status(500).json(err);
        }
    },
        // Post route to add a reaction to a thought array - /api/thoughts/:thoughtId/reactions
        async addReaction(req, res) {
            console.log(req.body)
            try {
                // FInd relevant thought based on id parameter.
                const thought = await Thought.findByIdAndUpdate(
                    req.params.thoughtId,
                    // Add relevant reaction to array
                    { $addToSet: { reactions: req.body }},
                    // validate and return updated values
                    { runValidators: true, new: true }
                ); 

                if (!thought) {
                    return res.status(404).json({
                        message: 'Thought ID incorrect. Unable to add reaction.'
                    })
                };
                res.json(['Succesfully added reaction.', thought]);
    
            } catch(err) {
                res.status(500).json(err);
            }
        },
        // Delete route to remove a reaction from a thought - /api/thoughts/:thoughtId/reactions/
        async deleteReaction(req, res) {
            try {
                console.log(req.body.reactionId)
                const thought = await Thought.findByIdAndUpdate(
                    // Find relevant thought by thoughtId parameter.
                    { _id: req.params.thoughtId },
                    // Remove reaction from that thought based on reactionId parameter.
                    { $pull: { reactions: { $in: [{reactionId: req.body.reactionId}] } } },
                    // Validate and return updated user.
                    { runValidators: true, new: true }
                  );

                //   console.log(thought);

                  if (!thought) {
                    return res.status(404).json({
                        message: 'Thought ID incorrect. Unable to remove reaction.'
                    })
                  }
                
                  // Send confirmation message and updated user.
                  res.send(['reaction succesfully removed']);
        
    
            } catch (err) {
                res.status(500).json(err);
            }
        }
};