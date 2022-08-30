const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
    {
        medicalOrganization: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        date: {
            type: String,
            require: [true, 'Please add a date'],
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
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

/*

date: {
            type: Date,
            require: [true, 'Please add a date'],
            validate: {
                validator : function (v) {
                    return (
                        V.getTime() >= Date.now()
                    )
                },
                message: 'Date must be in the future'
              }
        },

*/

module.exports = mongoose.model('Event', eventSchema)