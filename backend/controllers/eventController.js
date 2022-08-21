const asyncHandler = require('express-async-handler')

const Event = require('../models/eventModel')

// @desc Get Events
// @route GET /api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find()

    res.status(200).json(events)
})

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