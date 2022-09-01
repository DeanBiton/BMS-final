const mongoose = require('mongoose')

const registerSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Event',
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Register', registerSchema)