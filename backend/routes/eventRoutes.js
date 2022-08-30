const express = require('express')
const router = express.Router()
const {setEvent, getEvents} = require('../controllers/eventController')
/*
const {getEvents, setEvents, updateEvents, deleteEvents} = require('../controllers/eventController')

router.route('/').get(getEvents).post(setEvents)
router.route('/:id').put(updateEvents).delete(deleteEvents)*/
//router.get('/', getEvents)

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getEvents).post(setEvent)

module.exports = router
