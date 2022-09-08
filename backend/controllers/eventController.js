const asyncHandler = require('express-async-handler')
const helper = require('./controllerHelper/helper')
const Event = require('../models/eventModel')
const BloodTypeTrack = require('../models/BloodTypeTrackModel')

// @desc Get Events
// @route GET /api/events
// @access Private
const getEvents = asyncHandler(async (req, res) => {
    let events = req.user.isMedicalOrganization ? 
        await Event.find({'medicalOrganization' : req.user.id}, {createdAt: 0, updatedAt: 0, __v: 0}) :
        await Event.find({}, {createdAt: 0, updatedAt: 0, __v: 0})

    events = await Promise.all(events.map(async event => {
        let bloodTypeDonated = await BloodTypeTrack.findById(event.bloodTypeDonated.toString(),
        {_id: 0, createdAt: 0, updatedAt: 0, __v: 0}).exec()
        let bloodTypeRegisters = await BloodTypeTrack.findById(event.bloodTypeRegisters.toString(), 
        {_id: 0, createdAt: 0, updatedAt: 0, __v: 0}).exec()
        let bloodTypeDemands = await BloodTypeTrack.findById(event.bloodTypeDemands.toString(),
        {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, 'Not specified': 0}).exec()

        let newEvent = {
            ...event._doc,
            bloodTypeDonated: bloodTypeDonated,
            bloodTypeRegisters: bloodTypeRegisters,
            bloodTypeDemands: bloodTypeDemands,
            status: helper.getEventStatus(event._doc.date, event._doc.timeStart, event._doc.timeEnd)
        }

        return newEvent
        }))
        
    events.sort(helper.compareEventsDate)
    res.status(200).json(events)
})

// @desc Set Event
// @route POST /api/events/
// @access Private
const setEvent = asyncHandler(async (req, res) => {

    helper.checkAuthorization(req, res, true)

    const bloodTypeDonated = await BloodTypeTrack.create({});
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
    date: new Date(req.body.date),
    timeStart: new Date(req.body.timeStart),
    timeEnd: new Date(req.body.timeEnd),
    city: req.body.city,
    address: req.body.address,
    bloodTypeDonated: bloodTypeDonated._id,
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
    
    const updatedEventFunc = async event => {
        let bloodTypeDonated = await BloodTypeTrack.findById(event.bloodTypeDonated.toString(),
        {_id: 0, createdAt: 0, updatedAt: 0, __v: 0}).exec()
        let bloodTypeRegisters = await BloodTypeTrack.findById(event.bloodTypeRegisters.toString(), 
        {_id: 0, createdAt: 0, updatedAt: 0, __v: 0}).exec()
        let bloodTypeDemands = await BloodTypeTrack.findById(event.bloodTypeDemands.toString(),
        {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, 'Not specified': 0}).exec()

        let newEvent = {
            ...event._doc,
            bloodTypeDonated: bloodTypeDonated,
            bloodTypeRegisters: bloodTypeRegisters,
            bloodTypeDemands: bloodTypeDemands,
        }
        return newEvent
    }

    const updatedEvent = await updatedEventFunc(event)

    res.status(200).json(updatedEvent)
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

    const bloodTypeDonated = await BloodTypeTrack.findById(event.bloodTypeDonated)
    const bloodTypeRegisters = await BloodTypeTrack.findById(event.bloodTypeRegisters)
    const bloodTypeDemands = await BloodTypeTrack.findById(event.bloodTypeDemands)

    await bloodTypeDonated.remove()
    await bloodTypeRegisters.remove()
    await bloodTypeDemands.remove()
    await event.remove()

    res.status(200).json({ id: req.params.id})
})

// @desc Refresh Event
// @route GET /api/events/refresh/:id
// @access Private
const refreshEvent = asyncHandler(async (req, res) => {

    const event = await Event.findById(req.params.id, {createdAt: 0, updatedAt: 0, __v: 0})

    if(!event){
        res.status(400)
        throw new Error("Event not found")
    }

    const refreshedEventFunc = async event => {
        let bloodTypeDonated = await BloodTypeTrack.findById(event.bloodTypeDonated.toString(),
        {_id: 0, createdAt: 0, updatedAt: 0, __v: 0}).exec()
        let bloodTypeRegisters = await BloodTypeTrack.findById(event.bloodTypeRegisters.toString(), 
        {_id: 0, createdAt: 0, updatedAt: 0, __v: 0}).exec()
        let bloodTypeDemands = await BloodTypeTrack.findById(event.bloodTypeDemands.toString(),
        {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, 'Not specified': 0}).exec()

        let newEvent = {
            ...event._doc,
            bloodTypeDonated: bloodTypeDonated,
            bloodTypeRegisters: bloodTypeRegisters,
            bloodTypeDemands: bloodTypeDemands,
        }
        return newEvent
    }

    const refreshedEvent = await refreshedEventFunc(event)
    //console.log(refreshedEvent)

    res.status(200).json(refreshedEvent)
})

module.exports = {
    setEvent, getEvents, updateEvent, deleteEvent, refreshEvent,
}