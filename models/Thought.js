// Require Schema and model from mongoose to enable setting up of schema
const {Schema, model } = require('mongoose');
// dayjs used in createdAt property in reactionSchema and thoughtSchema to format date.
const dayjs = require('dayjs');

const Reaction = require('./Reaction');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // dayjs used to format the date object.
            get: (createdAt) => dayjs(createdAt).format('DD/MM/YYYY hh:mm:ss'),
        },
        username: {
            type: String,
            required: true,
        },
        // reactionSchema added as a nested document.
        reactions: [Reaction]
    },
    {
        // Used to include reactionCount virtual.
        toJSON: {
        virtuals: true,
        },
    }
);

// Virtual returns a count of the reactions nested document array.
thoughtSchema.virtual('reactionCount').get(()=> {
    try {
        return this.reactions.length
    } catch {
        return 0
    }
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;