const asyncHandler = require('express-async-handler')
const Donation = require('../models/donationModel')
const helper = require('./controllerHelper/helper')
const Event = require('../models/eventModel')
const BloodTypeTrack = require('../models/BloodTypeTrackModel')
const User = require('../models/userModel')
const Register = require('../models/registerModel')

// @desc Get all Events donated
// @route GET /api/donations
// @access Private
const getDonations = asyncHandler(async (req, res) => {
    const donations = []
    await (await Donation.find({ user: req.user.id })).forEach((donation) =>{
        donations.push(donation.event)
    })
  
    res.status(200).json(donations)
})

// @desc Set donation
// @route POST /api/donations
// @access Private
const setDonation = asyncHandler(async (req, res) => {
    helper.checkAuthorization(req, res, false)

    // check if already donated
    const existedDonation = await Donation.find({
        user: req.user.id,
        event: req.body.eventId,
    })

    if(existedDonation.length) {
        res.status(401)
        throw new Error('User already donated')
    }

    // create new donation
    let donation = await Donation.create({
        user: req.user.id,
        event: req.body.eventId,
    })

    // update bloodTrack
    const event = await Event.findById(req.body.eventId)
    const bloodTypeDonated = await BloodTypeTrack.findById(event.bloodTypeDonated)
    await BloodTypeTrack.findByIdAndUpdate(
        bloodTypeDonated._id,
        {
            [req.user.bloodType] : bloodTypeDonated[req.user.bloodType] + 1
        }
    )
    
    // update the lastDonated field in the user
    let lastDonated
     if(req.user.lastDonated)
     {
        if(new Date(req.user.lastDonated) < new Date(event.date))
        {
            lastDonated = event.date
        }
     }
     else
     {
        lastDonated = event.date

     } 

    await User.findByIdAndUpdate(
            req.user.id,
            {lastDonated: lastDonated,}
        )

    res.status(200).json(donation.event)
})

// @desc Delete donation
// @route DELETE /api/donations
// @access Private
const deleteDonation = asyncHandler(async (req, res) => {

    helper.checkAuthorization(req, res, false)

    // check if already donated
    const donation = await Donation.find({
        user: req.user.id,
        event: req.params.id,
    })

    if(!donation.length) {
        res.status(401)
        throw new Error('Donation not found')
    }

    const id = donation[0]._id
    await donation[0].remove()

    // update bloodTrack
    const event = await Event.findById(req.params.id)
    const bloodTypeDonated = await BloodTypeTrack.findById(event.bloodTypeDonated)
    await BloodTypeTrack.findByIdAndUpdate(
        bloodTypeDonated._id,
        {
            [req.user.bloodType] : bloodTypeDonated[req.user.bloodType] - 1
        }
    )

    res.status(200).json({ id: req.params.id})
})

// @desc get event registers and donations
// @route POST /api/donations/event/:id
// @access Private
const getEventRegisters = asyncHandler(async (req, res) => {

    const event = await Event.findById(req.params.id, {createdAt: 0, updatedAt: 0, __v: 0})
    if(!event){
        res.status(400)
        throw new Error("Event not found")
    }

    const registers = await Register.find({event : event})
    await registers.map(async(register) => await User.findById(register.user))
    const donations = await Donation.find({event : event})
    await donations.map(async(donation) => await User.findById(donation.user))

    res.status(200).json({registers: registers, donations: donations})
})

module.exports = {
    getDonations, setDonation, deleteDonation, getEventRegisters
}