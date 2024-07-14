const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
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
);

module.exports = reactionSchema;