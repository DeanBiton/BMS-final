const asyncHandler = require('express-async-handler')

// @desc Get Events
// @route GET /api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get events'})
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

    res.status(200).json({ message: 'Set event'})
})

// @desc Update Event
// @route PUT /api/events/:id
// @access Public
const updateEvents = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update event ${req.params.id}`})
})

// @desc Delete Events
// @route DELETE /api/events/:id
// @access Public
const deleteEvents = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete event ${req.params.id}`})
})

module.exports = {
    getEvents, setEvents, updateEvents, deleteEvents
}