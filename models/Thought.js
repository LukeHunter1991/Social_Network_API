// Require Schema and model from mongoose toe nable setting up of schema
const {Schema, model } = require('mongoose');
// dayjs used in createdAt property in reactionSchema and thoughtSchema to format date.
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: {
            // Declares reaction Id as type ObjectId available in mongoose.
            type: Schema.Types.ObjectId,
            // Generates new id.
            default: () => new mongoose.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // dayjs used to format the date object.
            get: (createdAt) => dayjs(createdAt).format('DD/MM/YYYY hh:mm:ss'),
        }
    }
)


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
        reactions: [reactionSchema]
    },
    {
        // Used to include friendCount virtual.
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

// Virtual returns a count of the reactions nested document array.
thoughtSchema.virtual('reactionCount').get(()=> {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;