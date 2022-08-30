const mongoose = require('mongoose')

const bloodTypeTrackSchema = mongoose.Schema(
    {
        "O-": {
            type: Number,
            require: [true, 'Please add an integer value'],
            min: [0, 'credit cannot be non-negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            default: 0,
        },
        "O+": {
            type: Number,
            require: [true, 'Please add an integer value'],
            min: [0, 'credit cannot be non-negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            default: 0,
        },
        "A-": {
            type: Number,
            require: [true, 'Please add an integer value'],
            min: [0, 'credit cannot be non-negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            default: 0,
        },
        "A+": {
            type: Number,
            require: [true, 'Please add an integer value'],
            min: [0, 'credit cannot be non-negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            default: 0,
        },
        "B-": {
            type: Number,
            require: [true, 'Please add an integer value'],
            min: [0, 'credit cannot be non-negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            default: 0,
        },
        "B+": {
            type: Number,
            require: [true, 'Please add an integer value'],
            min: [0, 'credit cannot be non-negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            default: 0,
        },
        "AB-": {
            type: Number,
            require: [true, 'Please add an integer value'],
            min: [0, 'credit cannot be non-negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            default: 0,
        },
        "AB+": {
            type: Number,
            require: [true, 'Please add an integer value'],
            min: [0, 'credit cannot be non-negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            default: 0,
        },
        "Not specified": {
            type: Number,
            require: [true, 'Please add an integer value'],
            min: [0, 'credit cannot be non-negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            default: 0,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('BloodTypeTrack', bloodTypeTrackSchema)