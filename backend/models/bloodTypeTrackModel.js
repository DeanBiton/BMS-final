const mongoose = require('mongoose')

const bloodTypeTrackSchema = mongoose.Schema(
    {
        "A+": {
            type: Number,
            require: [true, 'Please add an integer value'],
            min: [0, 'credit cannot be non-negative'],
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
              }
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('BloodTypeTrack', bloodTypeTrackSchema)