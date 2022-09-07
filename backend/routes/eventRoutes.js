const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
    setEvent, 
    getEvents, 
    updateEvent, 
    deleteEvent,
    refreshEvent,
} = require('../controllers/eventController')


router.route('/').get(protect, getEvents).post(protect, setEvent)
router.route('/:id').delete(protect, deleteEvent).put(protect, updateEvent)
router.route('/refresh/:id').put(protect, refreshEvent)
module.exports = router
