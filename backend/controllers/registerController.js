const asyncHandler = require('express-async-handler')
const Register = require('../models/registerModel')

// @desc Get all Events registered
// @route GET /api/registers
// @access Private
const getRegisters = asyncHandler(async (req, res) => {
    const registers = []
    await (await Register.find({ user: req.user.id })).forEach((register) =>{
        registers.push(register.event)
    })
  
    res.status(200).json(registers)
})

// @desc Set register
// @route POST /api/registers
// @access Private
const setRegister = asyncHandler(async (req, res) => {

    // Check for user    
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user is NOT a medical organization
    if (req.user.isMedicalOrganization) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const register = await Register.create({
        user: req.user.id,
        event: req.body.eventId,
    })

    res.status(200).json(register)
})

module.exports = {
    getRegisters, setRegister
}