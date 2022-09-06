const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
    {
        medicalOrganization: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        date: {
            type: Date,
            require: [true, 'Please add a date'],
        },
        timeStart: {
            type: Date,
            require: [true, 'Please add the start time'],
        },
        timeEnd: {
            type: Date,
            require: [true, 'Please add the end time'],
        },
        city: {
            type: String,
            required: [true, 'Please add a city'],
        },
        address: {
            type: String,
            required: [true, 'Please add an address'],
        },
        bloodTypeDonated: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'BloodTypeTrack',
        },
        bloodTypeRegisters: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'BloodTypeTrack',
        },
        bloodTypeDemands: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'BloodTypeTrack',
        },
        isEmergency: {
            type: Boolean,
            require: true,
            default: false,
        },

    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Event', eventSchema)