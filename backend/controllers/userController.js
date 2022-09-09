const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const helper = require('./controllerHelper/helper')


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    tz: helper.getRandomId(),
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      tz: user.tz,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      isMedicalOrganization: user.isMedicalOrganization,
      bloodType: user.bloodType,
      lastDonated: user.lastDonated,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  
  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      tz: user.tz,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      isMedicalOrganization: user.isMedicalOrganization,
      bloodType: user.bloodType,
      lastDonated: user.lastDonated,
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @desc    Update bloodType
// @route   PUT /api/users/:id
// @access  Private
const updateBloodType = asyncHandler(async (req, res) => {

  helper.checkAuthorization(req, res, true)

  const user = await User.findOne({tz : req.params.id})

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  const pastBloodType = user.bloodType

  // check valid blood type
  if(!helper.isBloodType(req.body.bloodType))
  {
    res.status(401)
    throw new Error('Invalid blood type')
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, {
    bloodType: req.body.bloodType,
  })

  const id = user._id
  const bloodType = req.body.bloodType

  helper.updateBloodTypesInEvents(id, bloodType, pastBloodType)
  res.status(200).json(updatedUser)
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateBloodType,
}
