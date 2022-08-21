// @desc Get Events
// @route GET /api/events
// @access Public
const getEvents = (req, res) => {
    res.status(200).json({ message: 'Get events'})
}

// @desc Set Event
// @route POST /api/events
// @access Public
const setEvents = (req, res) => {
    res.status(200).json({ message: 'Set event'})
}

// @desc Update Event
// @route PUT /api/events/:id
// @access Public
const updateEvents = (req, res) => {
    res.status(200).json({ message: `Update event ${req.params.id}`})
}

// @desc Delete Events
// @route DELETE /api/events/:id
// @access Public
const deleteEvents = (req, res) => {
    res.status(200).json({ message: `Delete event ${req.params.id}`})
}

module.exports = {
    getEvents, setEvents, updateEvents, deleteEvents
}