const asyncHandler = require('express-async-handler')
const helper = require('./controllerHelper/helper')
const Event = require('../models/eventModel')
const BloodTypeTrack = require('../models/BloodTypeTrackModel')

// @desc Get Events
// @route GET /api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
    let events = await Event.find()

    events = await Promise.all(events.map(async event => { 
        let bloodTypeRegisters = await BloodTypeTrack.findById(event.bloodTypeRegisters.toString(), 
        {_id: 0, createdAt: 0, updatedAt: 0, __v: 0}).exec()
        let bloodTypeDemands = await BloodTypeTrack.findById(event.bloodTypeDemands.toString(),
        {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, 'Not specified': 0}).exec()

        //bloodTypeRegisters = await helper.removeMongooseExtras(bloodTypeRegisters)
        //bloodTypeDemands = await helper.removeMongooseExtras(bloodTypeDemands)
        bloodTypeRegisters = helper.removeMongooseExtras(bloodTypeRegisters)
        helper.removeMongooseExtras(bloodTypeDemands)

        let newEvent = {
            ...event._doc,
            bloodTypeRegisters: bloodTypeRegisters,
            bloodTypeDemands: bloodTypeDemands,
        }

        newEvent = helper.removeMongooseExtras(newEvent)
        helper.removeMongooseExtras(newEvent)

        return newEvent
        }))

    res.status(200).json(events)
})

// @desc Set Event
// @route POST /api/events/
// @access Private
const setEvent = asyncHandler(async (req, res) => {

    helper.checkAuthorization(req, res, true)

    const bloodTypeRegisters = await BloodTypeTrack.create({});
    const bloodTypeDemands = await BloodTypeTrack.create({
        'O-': req.body['O-'], 
        'O+': req.body['O+'], 
        'A-': req.body['A-'], 
        'A+': req.body['A+'],
        'B-': req.body['B-'], 
        'B+': req.body['B+'], 
        'AB-': req.body['AB-'], 
        'AB+': req.body['AB+'],
    });

    const event = await Event.create({
    medicalOrganization: req.user.id,
    date: req.body.date,
    location: req.body.location,
    bloodTypeRegisters: bloodTypeRegisters._id,
    bloodTypeDemands: bloodTypeDemands._id,
    })
    res.status(200).json(event)
})

// @desc Update Event
// @route PUT /api/events/:id
// @access Private
const updateEvent = asyncHandler(async (req, res) => {
    
    helper.checkAuthorization(req, res, true)
    
    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(400)
        throw new Error("Event not found")
    }

    const bloodTypeDemands = await BloodTypeTrack.findById(event.bloodTypeDemands)

    const updatedBloodTypeDemands = await BloodTypeTrack.findByIdAndUpdate(
        bloodTypeDemands, 
        {
            'O-': req.body['O-'], 
            'O+': req.body['O+'], 
            'A-': req.body['A-'], 
            'A+': req.body['A+'],
            'B-': req.body['B-'], 
            'B+': req.body['B+'], 
            'AB-': req.body['AB-'], 
            'AB+': req.body['AB+'],
        }
    )
    
    res.status(200).json(event)
})

// @desc Delete Event
// @route DELETE /api/events/:id
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {

    helper.checkAuthorization(req, res, true)

    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(400)
        throw new Error("Event not found")
    }

    const bloodTypeRegisters = await BloodTypeTrack.findById(event.bloodTypeRegisters)
    const bloodTypeDemands = await BloodTypeTrack.findById(event.bloodTypeDemands)

    await bloodTypeRegisters.remove()
    await bloodTypeDemands.remove()
    await event.remove()

    res.status(200).json({ id: req.params.id})
})

/*
// @desc Set Event
// @route POST /api/events
// @access Public
const setEvents = asyncHandler(async (req, res) => {
    if(!req.body.text){
        //res.status(400).json({message: 'Please add a text field'})
        res.status(400)
        throw new Error('Please add a text field')
    }

    const event = await Event.create({
        text: req.body.text
    })

    res.status(200).json(event)
})

// @desc Update Event
// @route PUT /api/events/:id
// @access Public
const updateEvents = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(400)
        throw new Error("Event not found")
    }

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
    )

    res.status(200).json(updatedEvent)
})

// @desc Delete Events
// @route DELETE /api/events/:id
// @access Public
const deleteEvents = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(400)
        throw new Error("Event not found")
    }

    await event.remove()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getEvents, setEvents, updateEvents, deleteEvents
}
*/

module.exports = {
    setEvent, getEvents, updateEvent, deleteEvent
}