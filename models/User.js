// Require Schema and model from mongoose toe nable setting up of schema
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        // Username is required, unique, and trim method will be performed to remove unnecessary white space.
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // Regex used to validate email address.
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Email not valid'],
        },
        // References thought schema as an array of Object Ids
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        // References self (user schema) sas an array of Object Ids
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    },
    {
        // Used to include friendCount virtual.
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
    
);
// Virtual to retur a count of the friends array.
userSchema.virtual('friendCount').get(() => {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;