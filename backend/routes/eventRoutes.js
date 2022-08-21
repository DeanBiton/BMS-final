const express = require('express')
const router = express.Router()
const {getEvents, setEvents, updateEvents, deleteEvents} = require('../controllers/eventController')

router.route('/').get(getEvents).post(setEvents)
router.route('/:id').put(updateEvents).delete(deleteEvents)
//router.get('/', getEvents)

module.exports = router
