const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    isMedicalOrganization: {
      type: Boolean,
      require: true,
      default: false,
    },
    bloodType: {
      type: String,
      enum: ['None', 'Not specified', 'O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      require: true,
      default: 'Not specified',
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
