const asyncHandler = require('express-async-handler')
const Register = require('../models/registerModel')
const helper = require('./controllerHelper/helper')
const Event = require('../models/eventModel')
const BloodTypeTrack = require('../models/BloodTypeTrackModel')

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
    helper.checkAuthorization(req, res, false)

    // check if already registered
    const existedRegister = await Register.find({
        user: req.user.id,
        event: req.body.eventId,
    })

    if(existedRegister.length) {
        res.status(401)
        throw new Error('User already registered')
    }

    // create new register
    let register = await Register.create({
        user: req.user.id,
        event: req.body.eventId,
    })

    // update bloodTrack
    const event = await Event.findById(req.body.eventId)
    const bloodTypeRegisters = await BloodTypeTrack.findById(event.bloodTypeRegisters)
    await BloodTypeTrack.findByIdAndUpdate(
        bloodTypeRegisters._id,
        {
            [req.user.bloodType] : bloodTypeRegisters[req.user.bloodType] + 1
        }
    )

    res.status(200).json(register.event)
})

// @desc Delete Register
// @route DELETE /api/registers
// @access Private
const deleteRegister = asyncHandler(async (req, res) => {

    helper.checkAuthorization(req, res, false)

    // check if already registered
    const register = await Register.find({
        user: req.user.id,
        event: req.params.id,
    })

    if(!register.length) {
        res.status(401)
        throw new Error('Registration not found')
    }

    const id = register[0]._id
    await register[0].remove()

    // update bloodTrack
    const event = await Event.findById(req.params.id)
    const bloodTypeRegisters = await BloodTypeTrack.findById(event.bloodTypeRegisters)
    await BloodTypeTrack.findByIdAndUpdate(
        bloodTypeRegisters._id,
        {
            [req.user.bloodType] : bloodTypeRegisters[req.user.bloodType] - 1
        }
    )

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getRegisters, setRegister, deleteRegister
}