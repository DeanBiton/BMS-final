const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
    getDonations,
    setDonation,
    deleteDonation,
    getEventRegisters,
} = require('../controllers/donationController')

router.route('/').get(protect, getDonations).post(protect, setDonation)
router.route('/:id').delete(protect, deleteDonation)
router.route('/event/:id').put(protect, getEventRegisters)

module.exports = router
